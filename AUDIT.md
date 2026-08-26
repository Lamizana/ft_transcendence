# 📊 AUDIT COMPLET DU PROJET FT_TRANSCENDENCE

> **Date de l'audit** : 26 août 2026
> **Réalisé par** : Agent MkDocs Material Expert & Auditor
> **Périmètre** : Code source complet (Django, JS, Docker, Nginx, Templates)

---

## Table des matières

1. [Diagnostic Général](#1-diagnostic-général)
2. [Sécurité (Failles critiques)](#2--sécurité--failles-critiques)
3. [Architecture & Modèle de données](#3--architecture--modèle-de-données)
4. [Frontend & JavaScript](#4--frontend--javascript)
5. [DevOps & Docker](#5--devops--docker)
6. [Code Python](#6--code-python)
7. [Accessibilité & HTML](#7--accessibilité--html)
8. [Documentation](#8--documentation)
9. [Plan d'Action Automatisé](#9--plan-daction-automatisé)

---

## 1. Diagnostic Général

**Score global : 32/100**

| Catégorie | Score | Commentaire |
|---|---|---|
| 🔒 Sécurité | 15/100 | Failles critiques (secrets dans git, mots de passe en clair) |
| 🏗️ Architecture | 35/100 | Modèle Player monolithique, vues dupliquées |
| 🧹 Qualité du code | 25/100 | Code dupliqué massif, pas de tests, debug partout |
| 🎨 Frontend | 40/100 | Système de traduction brittle, CSS/JS non modulaires |
| 🐳 DevOps | 30/100 | Entrypoint fragile, images non versionnées |
| 📝 Documentation | 25/100 | Pas de README technique, notes de cours non structurées |
| 🧪 Tests | 0/100 | Aucun test |
| ♿ Accessibilité | 10/100 | Pas de alt text, pas de ARIA, pas de sémantique |

### Points forts

- Le jeu Pong fonctionne (1v1, local multiplayer, 4 joueurs, tournoi)
- Le multi-langage (FR/ES/EN) est implémenté
- Le système Docker/Nginx/SSL est en place
- La structure des dossiers est relativement claire

### Axes prioritaires d'amélioration (par impact/effort)

| Priorité | Axe | Impact | Effort |
|---|---|---|---|
| 🔴 **P1** | Sécurité (secrets, mots de passe) | Critique | Faible |
| 🔴 **P1** | Suppression du code debug (`print()`) | Élevé | Faible |
| 🟠 **P2** | Refactor du modèle de données | Élevé | Moyen |
| 🟠 **P2** | Suppression du code dupliqué JS | Élevé | Moyen |
| 🟠 **P2** | Système de traduction robuste | Élevé | Moyen |
| 🟡 **P3** | Nommage et conventions Python | Moyen | Faible |
| 🟡 **P3** | DevOps (images versionnées, entrypoint) | Moyen | Faible |
| 🟡 **P3** | Ajout de tests | Moyen | Moyen |
| 🟢 **P4** | Accessibilité templates | Moyen | Moyen |
| 🟢 **P4** | Authentification distante (OAuth 42) | Élevé | Élevé |

---

## 2. 🔴 Sécurité — Failles critiques

### 2.1. Le fichier `.env` contient des secrets et n'est pas dans `.gitignore`

**Fichier** : `.env`

```
SECRET_KEY=H2s5ke6YkSW2xw98KuE6
SQL_PASSWORD=H2s5k6hK465c4dgHkSW2xw98KuE6
POSTGRES_PASSWORD=H2s5k6hK465c4dgHkSW2xw98KuE6
```

**Risque** : Ces clés sont accessibles à quiconque clone le dépôt.

**Correction** :
- Ajouter `.env` au `.gitignore`
- Générer de nouvelles clés
- Documenter le processus de création d'un `.env` via un fichier `.env.example`
- Utiliser `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` pour générer une nouvelle SECRET_KEY

### 2.2. `ALLOWED_HOSTS = ['*']` en production

**Fichier** : `apps/website/settings.py` (ligne 23)

```python
ALLOWED_HOSTS = ['*']
```

**Risque** : Accepte n'importe quel header `Host` → attaques par en-tête `Host` (cache poisoning, password reset poisoning).

**Correction** :
```python
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
```

### 2.3. Mot de passe stocké en clair dans `change_password()`

**Fichier** : `apps/pong/views.py` (ligne 74)

```python
def change_password(request):
    # ...
    form = CustomPasswordChangeForm(user=request.user, data=body)
    if request.method == 'POST':
        if form.is_valid():
            request.user.password = body['new_password1']  # ← MOT DE PASSE EN CLAIR !
            user = form.save()
            update_session_auth_hash(request, user)
```

**Risque** : La ligne `request.user.password = body['new_password1']` écrase le hash du mot de passe par le plaintext **avant** que `form.save()` ne le re-hashe. C'est une faille critique : le mot de passe est stocké en clair temporairement, et si `form.save()` échoue, il reste en clair.

**Correction** :
```python
if form.is_valid():
    user = form.save()
    update_session_auth_hash(request, user)
    return redirect("pong:index")
```
Supprimer la ligne `request.user.password = body['new_password1']`.

### 2.4. API REST sans authentification

**Fichier** : `apps/pong/views.py`

Tous les ViewSets (`ScoreGame`, `TournamentViewSet`, `ProfilViewSet`, `Changelanguage`, `ChangeStatus`) n'ont **aucune permission** définie. N'importe qui peut modifier les scores, les tournois, les profils via l'API REST.

```python
class ScoreGame(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = ScoreModelSerializer
    # Pas de permission_classes !
```

**Correction** :
```python
from rest_framework.permissions import IsAuthenticated

class ScoreGame(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = ScoreModelSerializer
    permission_classes = [IsAuthenticated]
```

Appliquer à tous les ViewSets.

### 2.5. Nginx : certificats SSL auto-signés générés au build

**Fichier** : `nginx/Dockerfile`

```dockerfile
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt \
    -subj "/CN=localhost"
```

**Risque** : Les certificats sont régénérés à chaque build, expirent après 365 jours, et sont auto-signés (les navigateurs affichent un avertissement).

**Correction** : Pour la production, utiliser Let's Encrypt avec Certbot, ou monter un volume externe pour les certificats.

### 2.6. CORS et CSRF mal configurés

**Fichier** : `apps/website/settings.py`

```python
CORS_ALLOWED_ORIGINS = [
    "https://localhost:8080",
    "https://127.0.0.1:8080",
]
CSRF_TRUSTED_ORIGINS = [
    "https://localhost:8080",
    "https://127.0.0.1:8080",
]
# Puis en ligne 169, CSRF_TRUSTED_ORIGINS est DÉFINI UNE DEUXIÈME FOIS :
CSRF_TRUSTED_ORIGINS = ['https://127.0.0.1:8080', 'https://localhost:8080']
```

**Problème** : La variable `CSRF_TRUSTED_ORIGINS` est définie deux fois. La seconde écrase la première. Il faut harmoniser et garder une seule définition.

---

## 3. 🟠 Architecture & Modèle de données

### 3.1. Modèle `Player` monolithique — antipattern grave

**Fichier** : `apps/pong/models.py`

Le modèle `Player` contient **tout** dans une seule table :

```python
class Player(models.Model):
    # Infos profil
    nickname, picture, language, status, owner
    # Statistiques
    wins, loses
    # Historique des duels (ArrayField !)
    duelMyname, duelEnemy, duelMe, duelThem, date
    # Tournois (ArrayField !)
    tourPos, tourAll
    # Amis (ArrayField !)
    FriendsId
```

**Problèmes** :
- **Les `ArrayField` pour les relations** (amis, duels, tournois) violent le 1NF (première forme normale). Impossible de requêter efficacement, pas d'intégrité référentielle, pas de cascade.
- **N+1 queries** : pour afficher les amis, il faut un `Player.objects.filter(id__in=friends_ids)` qui charge tout.
- **Taille de la table** : chaque joueur est une ligne énorme avec des tableaux qui grossissent à chaque partie.
- **Pas de normalisation** : un joueur peut jouer 1000 parties → le champ `duelMyname` contient un tableau de 1000 éléments.

**Solution recommandée** :

```
Player (profil de base)
├── DuelResult (table séparée : player, opponent, my_score, opponent_score, date)
├── TournamentResult (table séparée : player, position, total_players)
├── Friend (table ManyToMany : player, friend)
└── User (Django auth — déjà existant)
```

Modèle refactorisé :
```python
class Player(models.Model):
    date_added = models.DateTimeField(auto_now_add=True)
    nickname = models.CharField(max_length=20, unique=True,
        validators=[MinLengthValidator(2)])
    picture = models.ImageField(upload_to="avatars/", default="default.png")
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    status = models.IntegerField(default=0)  # 0=offline, 1=online

    @property
    def wins(self):
        return self.duel_results.filter(won=True).count()

    @property
    def losses(self):
        return self.duel_results.filter(won=False).count()

class DuelResult(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='duel_results')
    opponent_name = models.CharField(max_length=20)
    player_score = models.IntegerField()
    opponent_score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    won = models.BooleanField()

class TournamentResult(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='tournament_results')
    position = models.IntegerField()
    total_players = models.IntegerField(default=4)
    date = models.DateTimeField(auto_now_add=True)

class Friendship(models.Model):
    user = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='friends')
    friend = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='friend_of')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'friend')
```

### 3.2. Vues dupliquées entre `pong/views.py` et `utilisateurs/views.py`

**Fichiers** : `apps/pong/views.py`, `apps/utilisateurs/views.py`

La fonction `_get_profil()` est **copiée-collée** dans les deux fichiers :

```python
# Identique dans les deux fichiers :
def _get_profil(request):
    try:
        return Player.objects.get(owner=request.user)
    except ObjectDoesNotExist:
        return None
```

**Correction** : Déplacer `_get_profil()` dans un module partagé (ex: `pong/utils.py`) ou dans un mixin.

### 3.3. ViewSets cassés — ne retournent jamais rien

**Fichier** : `apps/pong/views.py`

Cinq ViewSets ont des méthodes `put()` qui ne retournent **jamais** de `Response()` :

```python
class ScoreGame(viewsets.ModelViewSet):
    def put(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            nickname = serializer.data.get('nickname')
            wins = serializer.data.get('wins')
            # ... récupère les données mais ne retourne JAMAIS de réponse
            # → Retourne None → erreur 500

class TournamentViewSet(viewsets.ModelViewSet):
    def put(self, request, format=None):
        # Même problème

class Changelanguage(viewsets.ModelViewSet):
    def put(self, request, format=None):
        # Même problème

class ChangeStatus(viewsets.ModelViewSet):
    def put(self, request, format=None):
        # Même problème
```

Ces ViewSets sont donc **silencieusement cassés**. De plus, les `ModelViewSet` fournissent déjà `update()` (PUT) par défaut — redéfinir `put()` est inutile et crée une confusion.

**Correction** : Supprimer les méthodes `put()` redondantes et laisser DRF gérer l'update via `update()` surchargé (comme `ProfilViewSet` le fait correctement).

### 3.4. Serializer `PlayerModelSerializer` référence un champ inexistant

**Fichier** : `apps/pong/serializers.py` (ligne 7)

```python
class PlayerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'nickname', 'email', 'password')
        #                                                    ^^^^^^^^
        # Le modèle Player n'a PAS de champ 'email' ni 'password'
```

Ce serializer provoquera une erreur si utilisé.

### 3.5. Serializer `UserJoinModelSerializer` référence un champ inexistant

**Fichier** : `apps/pong/serializers.py` (ligne 16)

```python
class UserJoinModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'players2')
        #                     ^^^^^^^^
        # Le modèle Player n'a PAS de champ 'players2'
```

---

## 4. 🟠 Frontend & JavaScript

### 4.1. Le système de traduction est un anti-pattern massif

**Fichiers** : Tous les templates HTML + `static/js/router.js`

**Approche actuelle** : chaque texte est dupliqué 3 fois dans le HTML avec `lang="fr/es/en"` + `display:none`, puis un script JS parcourt **tous les éléments** pour les afficher/masquer.

```html
<!-- 3x le même lien dans la navbar -->
<a style="display: none;" lang="fr" href="...">Profil</a>
<a style="display: none;" lang="es" href="...">Perfil</a>
<a style="display: none;" lang="en" href="...">Profile</a>
```

**Problèmes** :
- **3x le HTML** → page 3x plus lourde
- `router.js` fait `querySelectorAll` sur chaque type de tag (h1, h2, div, a, p, small, button) → **lourd et fragile**
- **Reflow/repaint** massif à chaque changement de langue
- Les `id` sont dupliqués (`id="profil_link"` apparaît 3 fois → HTML invalide)
- Les modales ont des IDs uniques par langue (`1v1`, `1v1es`, `1v1en`) → triplication du code

**Solution recommandée** :

Option A — **Django i18n** (recommandé) :
```python
# settings.py
USE_I18N = True
LANGUAGE_CODE = 'fr'
```
Utiliser `{% trans "Profil" %}` dans les templates et `{% load i18n %}`.

Option B — **Dictionnaire JS** :
```javascript
const translations = {
    fr: { profil: "Profil", jeu: "Jeu", amis: "Amis" },
    es: { profil: "Perfil", juego: "Juego", amigos: "Amigos" },
    en: { profil: "Profile", game: "Game", friends: "Friends" }
};
function t(key) { return translations[language][key] || key; }
```

### 4.2. Le routeur SPA custom est fragile

**Fichier** : `static/js/router.js` + `static/js/base.js`

```javascript
// router.js — routeur maison
const urlLocationHandler = async () => {
    const html = await fetch(location).then((response) => response.text());
    document.querySelector('html').innerHTML = html;  // ← remplace TOUT le DOM
    // Puis parse le HTML en string pour extraire les variables JS...
}

// base.js — extraction de données par parsing de string
var newId = "";
var i = 11;
while ((scriptt[0].innerHTML[i]) != '\'') {
    newId += scriptt[0].innerHTML[i]
    i++;
}
id = newId
```

**Problèmes** :
- Remplace tout le DOM → perd les event listeners, les states
- Parse le HTML en string pour extraire `id` et `language` (lignes 43-58 de `base.js`) → **extrêmement fragile** (casse si le format du template change)
- Les `<script>` réinjectés ne sont pas ré-exécutés dans certains navigateurs
- Les event listeners de `keydown` s'accumulent (pas de `removeEventListener`) → fuite mémoire
- `loadFriends()` utilise `setInterval(loadFriends, 10000)` → crée un interval à chaque rechargement sans jamais le clear

**Solution** : Soit un vrai framework léger (htmx, Alpine.js), soit rester avec le Django classique avec redirections serveur.

### 4.3. Code JS massivement dupliqué

| Fichier | Lignes | Duplication estimée |
|---|---|---|
| `pong.js` | 652 | ~40% dupliqué avec `tournament.js` |
| `pong4player.js` | 692 | ~60% dupliqué avec `pong.js` |
| `tournament.js` | 783 | ~50% dupliqué avec `pong.js` |
| `base.js` | 177 | 3 fonctions de traduction manuelle |

Le moteur de jeu (initialisation canvas, boucle de jeu, collisions, dessin) est copié-collé 3 fois avec de légères variantes.

**Exemple concret** — la gestion des touches est identique dans les 3 fichiers :
```javascript
// pong.js, pong4player.js, tournament.js — même code
function mousedownl1() {
    if (Pong.running === false) {
        Pong.player.playerState = 1;
        if (Pong.opponent.playerState == 1 || state == "Solo") {
            Pong.running = true;
            window.requestAnimationFrame(Pong.loop);
            Pong.player.speed = (-8 * Pong.canvas.height / 1000);
        }
    }
    else { Pong.player.speed = (-8 * Pong.canvas.height / 1000); }
}
left1.addEventListener("mousedown", function () {
    if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20);
});
// ... 30 lignes de touchstart/touchend/mouseup identiques
```

**Solution** : Refactorer en un module `PongEngine` unique paramétrable (mode solo, multi-local, 4 joueurs, tournoi).

### 4.4. Tous les CSS chargés sur toutes les pages

**Fichier** : `apps/pong/templates/pong/base.html`

```html
<link rel="stylesheet" href="{% static 'css/log.css' %}" />
<link rel="stylesheet" href="{% static 'css/friends.css' %}" />
<link rel="stylesheet" href="{% static 'css/signin.css' %}" />
<link rel="stylesheet" href="{% static 'css/profil.css' %}" />
<link rel="stylesheet" href="{% static 'css/base.css' %}" />
<link rel="stylesheet" href="{% static 'css/login.css' %}" />
<link rel="stylesheet" href="{% static 'css/pong.css' %}" />
```

7 fichiers CSS chargés sur **chaque page**, même si la page n'en utilise qu'un seul.

**Solution** : Fusionner en un seul fichier CSS ou charger conditionnellement via `{% block extra_css %}`.

### 4.5. jQuery + 2 versions de Bootstrap chargées

**Fichier** : `apps/pong/templates/pong/base.html` (lignes 113-115)

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

- **jQuery 3.5.1** : obsolète, et `django-bootstrap5` n'en a pas besoin
- **Bootstrap 4 + Bootstrap 5** : deux versions simultanées → conflits possibles, poids inutile (~150 Ko)
- CDN non integrity-checked → risque XSS si CDN compromis

**Correction** : Supprimer jQuery et Bootstrap 4, garder uniquement Bootstrap 5.

### 4.6. Scripts chargés hors du `<body>`

**Fichier** : `apps/pong/templates/pong/base.html` (lignes 113-141)

```html
</body>          <!-- ← body fermé ici -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="..."></script>
<!-- ... 8 scripts ... -->

</html>          <!-- ← scripts hors de body -->
```

Les scripts sont placés **après** `</body>`, ce qui est invalide HTML.

**Correction** : Déplacer les scripts avant `</body>`.

### 4.7. Variables injectées dans le HTML sans échappement

**Fichier** : `apps/pong/templates/pong/base.html` (lignes 118-133)

```html
<script class="scipt_data">
var id = '{{player.id}}';
var nickname = '{{player.nickname}}';
var email = '{{player.email}}';
var wins = '{{player.wins}}';
var loses = '{{player.loses}}';
var duelMyname = ['{{player.duelMyname}}'];
// ...
</script>
```

**Risque** : Si un nickname contient un `'` ou un `</script>`, il casse le HTML ou permet une injection XSS.

**Correction** : Utiliser `{% autoescape on %}` ou `{{ value|escapejs }}`.

---

## 5. 🟡 DevOps & Docker

### 5.1. Dockerfile sans versionnage

**Fichier** : `apps/Dockerfile`

```dockerfile
FROM python:3           # ← "3" = quelle version ? 3.8 ? 3.12 ?
```

**Fichier** : `nginx/Dockerfile`

```dockerfile
FROM nginx:latest       # ← "latest" = non reproductible
```

**Correction** :
```dockerfile
FROM python:3.12-slim
FROM nginx:1.25-alpine
```

### 5.2. Entrypoint exécute `makemigrations` en production

**Fichier** : `apps/entrypoint.sh`

```bash
python3 manage.py makemigrations   # ← DANGEREUX en prod
python3 manage.py migrate
```

`makemigrations` ne devrait **jamais** tourner en production. Les migrations doivent être pré-générées et commitées.

**Correction** :
```bash
#!/bin/sh
if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for postgres..."
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done
    echo "PostgreSQL started"
fi
python3 manage.py migrate --no-input
exec "$@"
```

### 5.3. `DEBUG = False` mais `.env` a `DEBUG=1`

**Fichier** : `apps/website/settings.py`

```python
DEBUG = False  # ← hardcoded, ignores .env
```

La valeur `DEBUG` du `.env` (`DEBUG=1`) est ignorée car `settings.py` l'écrase en dur.

**Correction** :
```python
DEBUG = os.environ.get("DEBUG", "0") == "1"
```

### 5.4. Variables d'environnement dupliquées dans `.env`

**Fichier** : `.env`

```
SQL_HOST=db              # ← doublon 1
DATABASE_HOST=db         # ← doublon 2 (même valeur)

SQL_PASSWORD=H2s5k6h...  # ← doublon
DATABASE_PASSWORD=H2s5k6h...  # ← doublon
POSTGRES_PASSWORD=H2s5k6h...  # ← doublon (3 fois le même mdp)
```

**Correction** : Harmoniser les noms de variables et n'en garder qu'un seul ensemble.

### 5.5. Le port d'API est codé en dur

**Fichier** : `apps/website/settings.py` (lignes 171-172)

```python
API_HOST = '127.0.0.1'
API_PORT = '8000'
```

Ces variables ne sont jamais utilisées dans le code. Si elles le sont un jour, elles devraient venir de `.env`.

---

## 6. 🟡 Code Python

### 6.1. `print()` de debug partout (35+ occurrences)

**Fichiers** : `apps/pong/views.py`, `apps/utilisateurs/views.py`

```python
print("vue _get_profil")        # pong/views.py:18
print("dans le put")            # pong/views.py:34
print("VUE new_profil")         # pong/views.py:139
print("INDEX VUE")              # pong/views.py:112
print("VUE PONG")               # pong/views.py:181
print("vue change_status")      # pong/views.py:256
print("VUE friends")            # pong/views.py:261
print("Changelanguage")         # pong/views.py:240
print("CHANGE STATUS")          # pong/views.py:248
print("vue change_password")    # pong/views.py:58
print("vue logout_view")        # utilisateurs/views.py:58
print("juste avant render")     # utilisateurs/views.py:52
print("vue _get_profil")        # utilisateurs/views.py:58
print("VUE new_profil")         # (dans les deux fichiers)
```

Ces prints polluent les logs de production et n'ont aucune valeur diagnostique.

**Correction** : Remplacer par `logging.debug()` ou `logging.info()` avec le module `logging` de Django.

### 6.2. `except:` bare (sans type d'exception)

**Fichier** : `apps/pong/views.py` (ligne 284)

```python
try:
    Player.objects.get(nickname=nickname)
except:  # ← attrape TOUT y compris SystemExit, KeyboardInterrupt
    return JsonResponse({'success': False, 'message': 'Nickname doesn\'t exists'})
```

**Correction** :
```python
try:
    Player.objects.get(nickname=nickname)
except Player.DoesNotExist:
    return JsonResponse({'success': False, 'message': 'Nickname doesn\'t exist'}, status=404)
```

### 6.3. Tests vides

**Fichiers** : `apps/pong/tests.py`, `apps/utilisateurs/tests.py`

```python
from django.test import TestCase
# Create your tests here.   ← Aucun test
```

**Impact** : Aucune couverture de test. Impossible de vérifier qu'une refactorisation ne casse rien.

### 6.4. Nommage non conventionnel

| Constat actuel | Convention Python/Django recommandée |
|---|---|
| `FriendsId` (camelCase) | `friends_ids` |
| `loses` | `losses` |
| `FriendForm.Meta` avec `model = Player` sur un `forms.Form` | Retirer le `Meta` inutile |
| `loginHomeMade` | `login_view` |
| `loginForm` | `LoginForm` |
| `pong()` (nom de vue = nom d'app) | `pong_view` |
| `base()` (nom de vue trop générique) | `base_view` ou `base_page` |
| `save_button_info` (nom cryptique) | `change_language` |
| `del_user` (abréviation) | `delete_user` |
| `_get_profil` (abréviation) | `_get_player_profile` |

### 6.5. Fonction `base()` qui redirige toujours

**Fichier** : `apps/pong/views.py` (lignes 124-132)

```python
def base(request):
    """La page d'accueil pour PONG."""
    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')
    return render(request, 'pong/base.html', {'player': player})
```

Cette vue est exposée à l'URL `/base/` mais rend le template `base.html` directement, ce qui est inutile (c'est le gabarit de base, pas une page). Elle est utilisée uniquement par `base.js` pour rafraîchir les données joueur. C'est une mauvaise pratique.

**Correction** : Créer une API endpoint dédiée (`/api/player/data/`) qui retourne du JSON au lieu de rendre un template complet.

### 6.6. Comparaison `== None` au lieu de `is None`

**Fichiers** : `apps/pong/views.py`, `apps/utilisateurs/views.py`

```python
if player == None:    # ← Mauvaise pratique
if player != None:    # ← Mauvaise pratique
```

**Correction** :
```python
if player is None:    # ← Correct
if player is not None:  # ← Correct
```

---

## 7. 🟢 Accessibilité & HTML

### 7.1. HTML invalide — IDs dupliqués

**Fichier** : `apps/pong/templates/pong/base.html`

```html
<a id="profil_link" lang="fr" href="...">Profil</a>
<a id="profil_link" lang="es" href="...">Perfil</a>
<a id="profil_link" lang="en" href="...">Profile</a>
```

`id="profil_link"` apparaît **3 fois** → HTML invalide. Les IDs doivent être uniques.

**Fichier** : `apps/pong/templates/pong/pong.html`

```html
<div class="d-grid mx-auto" id="forNames">   <!-- ← 1ère occurrence -->
    <div id="btns"></div>
    <div id="btns2"></div>
</div>
```

`id="forNames"` est défini deux fois dans la même page (ligne 38 et 41).

### 7.2. Pas de text alternatifs sur les images

**Fichier** : `apps/pong/templates/pong/profil.html` (ligne 28)

```html
<img src="{{ player.picture.url }}" class="img-fluid">
<!-- Pas de alt="" → inaccessible aux lecteurs d'écran -->
```

**Fichier** : `apps/pong/templates/pong/friends.html` (ligne 42)

```html
<img src="{{ friend.picture.url }}" class="img-fluid">
<!-- Pareil -->
```

**Correction** :
```html
<img src="{{ player.picture.url }}" class="img-fluid" alt="Photo de profil de {{ player.nickname }}">
```

### 7.3. Navigation non accessible

- Pas de `role="navigation"` sur la navbar
- Pas de `aria-label` sur les boutons
- Pas de `aria-current="page"` pour indiquer la page active
- Pas de `<nav aria-label="Navigation principale">`
- Les boutons de langue n'ont pas de label accessible

### 7.4. Page de déconnexion non multilingue

**Fichier** : `apps/utilisateurs/templates/registration/logged_out.html`

```html
<h2>Deconnexion.</h2>
<p>Vous avez été déconnecté. Merci de votre visite !</p>
```

Cette page n'est qu'en français, alors que tout le reste du site est trilingue.

### 7.5. `<main>` mal utilisé

**Fichier** : `apps/pong/templates/pong/base.html` (lignes 103-110)

```html
<main role="main" class="container">
    <div class="pb-2 mb-2">
        {% block page_header %}{% endblock page_header %}
    </div>
    <div>
        {% block content %}{% endblock content %}
    </div>
</main>
```

Le `<main>` est dans le gabarit mais les pages enfantent souvent mettent leur contenu dans `{% block page_header %}` au lieu de `{% block content %}`, ce qui crée une structure HTML imprévisible.

---

## 8. 📝 Documentation

### 8.1. README minimal

**Fichier** : `README.md` (18 lignes)

Le README contient uniquement les commandes de lancement Docker. Il manque :
- Description du projet
- Stack technique
- Prérequis
- Structure du projet
- Guide d'installation
- Guide de développement
- Contribution guidelines

### 8.2. Documentation `documentation/` non structurée

Le dossier `documentation/` contient 3 fichiers Markdown :
- `avancement.md` : checklist de progression (utile mais non rendu via MkDocs)
- `django.md` : notes de cours Django (pas une doc technique du projet)
- `web.md` : notes de cours Web (pas une doc technique du projet)

**Problème** : Ces fichiers mélangent notes de cours personnelles et documentation projet. Il n'y a pas de `mkdocs.yml` ni de structure MkDocs.

### 8.3. Pas de commentaires docstrings

Les modèles et vues ont quelques docstrings (`"""Affiche la page de profil."""`) mais la majorité du code (especially JS) n'a aucun commentaire expliquant la logique métier.

---

## 9. Plan d'Action Automatisé

| # | Action | Priorité | Fichiers concernés |
|---|---|---|---|
| 1 | Ajouter `.env` au `.gitignore`, créer `.env.example` | 🔴 P1 | `.gitignore`, `.env.example` |
| 2 | Corriger `change_password()` — supprimer `request.user.password = body[...]` | 🔴 P1 | `apps/pong/views.py` |
| 3 | Corriger `ALLOWED_HOSTS` avec variable d'env | 🔴 P1 | `apps/website/settings.py` |
| 4 | Ajouter `permission_classes` aux ViewSets | 🔴 P1 | `apps/pong/views.py` |
| 5 | Supprimer `CSRF_TRUSTED_ORIGINS` dupliqué | 🔴 P1 | `apps/website/settings.py` |
| 6 | Supprimer tous les `print()` et les remplacer par `logging` | 🔴 P1 | `apps/pong/views.py`, `apps/utilisateurs/views.py` |
| 7 | Corriger les `except:` bare en `except Model.DoesNotExist:` | 🟡 P3 | `apps/pong/views.py` |
| 8 | Corriger les comparaisons `== None` en `is None` | 🟡 P3 | `apps/pong/views.py`, `apps/utilisateurs/views.py` |
| 9 | Corriger `DEBUG` pour lire la variable d'env | 🟡 P3 | `apps/website/settings.py` |
| 10 | Supprimer les serializers cassés (`PlayerModelSerializer`, `UserJoinModelSerializer`) | 🟡 P3 | `apps/pong/serializers.py` |
| 11 | Supprimer `makemigrations` de l'entrypoint | 🟡 P3 | `apps/entrypoint.sh` |
| 12 | Versionner les images Docker (`python:3.12-slim`, `nginx:1.25-alpine`) | 🟡 P3 | `apps/Dockerfile`, `nginx/Dockerfile` |
| 13 | Retirer jQuery et Bootstrap 4 de `base.html` | 🟠 P2 | `apps/pong/templates/pong/base.html` |
| 14 | Corriger le HTML invalide (IDs dupliqués, scripts hors body) | 🟡 P3 | `apps/pong/templates/pong/base.html` |
| 15 | Ajouter `alt` text sur les images | 🟢 P4 | `apps/pong/templates/pong/profil.html`, `friends.html` |
| 16 | Fusionner les CSS en un seul fichier | 🟠 P2 | `apps/static/css/` |
| 17 | Échapper les variables JS injectées dans le HTML | 🔴 P1 | `apps/pong/templates/pong/base.html` |
| 18 | Refactorer le modèle Player en modèles séparés | 🟠 P2 | `apps/pong/models.py` |
| 19 | Refactorer le code JS dupliqué en module unique | 🟠 P2 | `apps/static/js/` |
| 20 | Implémenter un vrai système de traduction (Django i18n) | 🟠 P2 | Tous les templates + `settings.py` |
| 21 | Corriger les ViewSets cassés (retour manquant) | 🟠 P2 | `apps/pong/views.py` |
| 22 | Harmoniser le nommage Python | 🟡 P3 | Tous les fichiers Python |
| 23 | Ajouter des tests unitaires | 🟡 P3 | `apps/pong/tests.py`, `apps/utilisateurs/tests.py` |
| 24 | Compléter le README | 🟢 P4 | `README.md` |

---

## Résumé des métriques du projet

| Métrique | Valeur |
|---|---|
| Lignes de Python | ~700 |
| Lignes de JavaScript | ~2 700 |
| Lignes de HTML (templates) | ~1 100 |
| Lignes de CSS | ~400 |
| Nombre de fichiers Python | 26 |
| Nombre de templates HTML | 10 |
| Nombre de fichiers JS | 8 |
| Nombre de fichiers CSS | 7 |
| Nombre de tests | 0 |
| Nombre de `print()` de debug | 35+ |
| Doublons JS estimés | ~1 200 lignes |
| Taille du HTML par page (à cause de la traduction) | x3 |

<p align="center">
  <img src="https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django">
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx">
  <img src="https://img.shields.io/badge/HTML5%20Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Canvas">
</p>

<h1 align="center">ft_transcendance</h1>

<p align="center">
  <strong>Application web multijoueurs permettant de jouer à Pong en ligne, avec gestion de profils, statistiques, amis et tournois.</strong>
</p>

<p align="center">
  Projet final de Common Core — <br>
  Réalisé en mai 2024
</p>

---

## Table des matières

- [Table des matières](#table-des-matières)
- [Apercu](#apercu)
- [Fonctionnalites](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Installation et lancement](#installation-et-lancement)
  - [Pre-requis](#pre-requis)
  - [Lancement](#lancement)
  - [Acces](#acces)
  - [Commandes utiles](#commandes-utiles)
- [Variables d'environnement](#variables-denvironnement)
- [Modes de jeu](#modes-de-jeu)
  - [Solo](#solo)
  - [2 Joueurs (local)](#2-joueurs-local)
  - [4 Joueurs (local)](#4-joueurs-local)
  - [Tournoi](#tournoi)
- [Multi-langue](#multi-langue)
- [Architecture Docker](#architecture-docker)
- [Problemes connus](#problemes-connus)
- [Ameliorations futures](#ameliorations-futures)
- [Equipe](#equipe)
- [Licence](#licence)

---

## Apercu

**ft_transcendence** est une application web complète reproduisant le jeu classique **Pong** dans un navigateur. Les joueurs peuvent s'inscrire, créer un profil, affronter des adversaires en ligne ou en local, suivre leurs statistiques, gérer une liste d'amis et participer à des tournois.

Le projet repose sur une architecture **Django + PostgreSQL**, exposée via une **API REST** (Django REST Framework), servie par **Gunicorn** derrière un reverse proxy **Nginx** avec certificat SSL auto-signé. L'ensemble est conteneurisé avec **Docker Compose**.

Le rendu du jeu s'effectue directement sur un **Canvas HTML5** en Vanilla JavaScript, offrant une expérience fluide sans framework frontend lourd.

---

## Fonctionnalites

| Fonctionnalite | Description |
|----------------|-------------|
| **Jeu Pong multijoueur** | Partie en temps reel rendue sur Canvas HTML5 avec physique de balle et collisions |
| **4 modes de jeu** | Solo (vs IA), 2 joueurs local, 4 joueurs local, Tournoi a 4 |
| **Comptes utilisateurs** | Inscription, connexion, deconnexion avec authentification Django |
| **Profils joueurs** | Pseudo, photo de profil, statistiques detaillees (taux de victoire, historique des duels) |
| **Systeme d'amis** | Ajout / suppression d'amis par pseudo, statut online / offline en temps reel |
| **Multi-langue** | Interface disponible en Francais, Espagnol et Anglais |
| **Dashboard stats** | Graphique camembert (win rate), historique des duels avec dates, classement tournois |
| **Responsive** | Adaptation ecran desktop, tablette et mobile avec boutons tactiles integres |
| **API REST** | Endpoints CRUD pour scores, tournois, profils, langue et statut |

---

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| **Backend** | Django | 4.2.3 |
| **API REST** | Django REST Framework | 3.15.1 |
| **Langage** | Python | 3.12 |
| **Base de donnees** | PostgreSQL | 15 |
| **Serveur WSGI** | Gunicorn | 21.2.0 |
| **Reverse Proxy** | Nginx | latest |
| **SSL** | Certificat auto-signe (TLS 1.2 / 1.3) | - |
| **Frontend** | HTML5 Canvas, Vanilla JS, Bootstrap 5 | - |
| **Conteneurisation** | Docker + Docker Compose | - |
| **Gestion d'images** | Pillow | 10.3.0 |

---

## Architecture du projet

```
transcendance/
├── apps/
│   ├── pong/                 # Application principale
│   │   ├── models.py         #   Modele Player (stats, amis, duels)
│   │   ├── views.py          #   Vues + ViewSets REST
│   │   ├── urls.py           #   Routes application + API
│   │   ├── serializers.py    #   Serialiseurs DRF
│   │   ├── templates/        #   Templates HTML (pong, profil, friends...)
│   │   └── static/           #   JS (jeu, router, SPA) + CSS
│   ├── utilisateurs/         # Authentification
│   │   ├── views.py          #   Inscription, connexion, deconnexion
│   │   ├── urls.py           #   Routes auth
│   │   └── templates/        #   Templates login, register
│   ├── website/              # Configuration Django
│   │   ├── settings.py       #   Parametres projet
│   │   ├── urls.py           #   Routes racine + DRF router
│   │   └── wsgi.py           #   Point d'entree WSGI
│   ├── Dockerfile            #   Image Python 3.12 + dependances
│   ├── entrypoint.sh         #   Script de demarrage (migrations + Gunicorn)
│   └── requirements.txt      #   Dependances Python
├── nginx/
│   ├── Dockerfile            #   Image Nginx + certs SSL auto-signes
│   └── nginx.conf            #   Configuration reverse proxy
├── docker-compose.yml        #   Orchestration des 3 conteneurs
├── .env                      #   Variables d'environnement
├── AUDIT.md                  #   Audit technique interne du projet
└── README.md                 #   Ce fichier
```

---

## Installation et lancement

### Pre-requis

- [Docker](https://docs.docker.com/get-docker/) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)

### Lancement

```bash
# Cloner le depot
git clone https://github.com/VOTRE_USER/transcendance.git
cd transcendance

# Construire et lancer les conteneurs
docker compose up --build
```

### Acces

Ouvrez votre navigateur et acceptez le certificat auto-signe :

```
https://localhost:8080
```

> **Note :** Le certificat SSL est genere automatiquement lors du build Docker. Votre navigateur affichera un avertissement de securite — cliquez sur **Avance** puis **Continuer vers le site**.

### Commandes utiles

```bash
# Arreter les conteneurs sans supprimer les donnees
docker compose down

# Arreter les conteneurs ET supprimer les donnees (reset complet)
docker compose down -v

# Voir les logs en temps reel
docker compose logs -f

# Rebuild apres modification du code
docker compose up --build
```

---

## Variables d'environnement

Le fichier `.env` a la racine du projet contient les variables necessaires au fonctionnement. **Ne jamais commiter ce fichier avec des valeurs reelles.**

| Variable | Description |
|----------|-------------|
| `POSTGRES_USER` | Utilisateur PostgreSQL |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL |
| `POSTGRES_DB` | Nom de la base de donnees |
| `SECRET_KEY` | Cle secrete Django |
| `DEBUG` | Mode debug (0 ou 1) |
| `DJANGO_ALLOWED_HOSTS` | Hosts autorises par Django |
| `SQL_ENGINE` | Moteur de BDD (`django.db.backends.postgresql`) |
| `SQL_HOST` | Host de la BDD (service Docker `db`) |
| `SQL_PORT` | Port de la BDD (`5432`) |

> **Conseil :** Copiez le fichier `.env` en `.env.example` sans les valeurs sensibles pour documenter les variables necessaires aux futurs contributeurs.

---

## Modes de jeu

### Solo
Affrontez une **intelligence artificielle** qui predit la trajectoire de la balle avec un facteur aleatoire. Controles : `W` / `S` ou `Up` / `Down`.

### 2 Joueurs (local)
Deux joueurs sur le **meme clavier**. Joueur 1 : `W` / `S` — Joueur 2 : `Up` / `Down`. Premier a 3 points gagne.

### 4 Joueurs (local)
Quatre joueurs sur le **meme clavier**, chacun avec une couleur distincte :

| Position | Controles | Couleur |
|----------|-----------|---------|
| Gauche | `W` / `S` | Rouge |
| Bas | `A` / `D` | Bleu |
| Droite | `Up` / `Down` | Vert |
| Haut | `Left` / `Right` | Jaune |

### Tournoi
Format bracket a 4 joueurs :
1. **Demi-finale 1** — Joueur 1 vs Joueur 2
2. **Demi-finale 2** — Joueur 3 vs Joueur 4
3. **Finale** — Les deux vainqueurs s'affrontent
4. Classement final (1er, 2e, 3e) sauvegarde dans la base de donnees.

---

## Multi-langue

L'interface supporte trois langues, selectionnables depuis la barre de navigation :

- :fr: **Francais**
- :es: **Espagnol**
- :gb: **Anglais**

La langue choisie est sauvegardee dans le profil utilisateur et appliquee automatiquement a chaque connexion.

---

## Architecture Docker

Le projet utilise **Docker Compose** pour orchestrer trois conteneurs :

```
┌──────────────────────────────────────────────────────┐
│                     HOST :8080                       │
│                        │                             │
│                  ┌─────▼──────┐                      │
│                  │   NGINX    │  Reverse proxy       │
│                  │  (SSL/TLS) │  + static files      │
│                  └─────┬──────┘                      │
│                        │ proxy_pass                  │
│                  ┌─────▼──────┐                      │
│                  │    WEB     │  Django + Gunicorn   │
│                  │  (Django)  │  Port 8000           │
│                  └─────┬──────┘                      │
│                        │ psycopg2                   │
│                  ┌─────▼──────┐                      │
│                  │     DB     │  PostgreSQL 15       │
│                  │ (Postgres) │  Volume persistant   │
│                  └────────────┘                      │
└──────────────────────────────────────────────────────┘
```

| Conteneur | Image | Port expose | Role |
|-----------|-------|-------------|------|
| `nginx` | Build depuis `nginx/Dockerfile` | `8080` (HTTPS) | Reverse proxy, SSL, fichiers statiques |
| `web` | Build depuis `apps/Dockerfile` | `8000` (interne) | Application Django + Gunicorn |
| `db` | `postgres:15` | `5432` (interne) | Base de donnees PostgreSQL |

---

## Problemes connus

Ce projet presente certaines limitations techniques inherentes au contexte d'apprentissage :

- **Secrets dans le depot** : Le fichier `.env` contenant les mots de passe et la cle secrete Django est actuellement tracke par Git. Il devrait etre ajoute au `.gitignore`.
- **API REST non protegee** : Les ViewSets DRF ne definissent pas de `permission_classes`. Tout utilisateur (meme non connecte) peut modifier les scores et profils via l'API.
- **Model monolithique** : Le modele `Player` unique contient les statistiques, les duels, les tournois et les amis via des `ArrayField` PostgreSQL, ce qui viole la premiere forme normale.
- **Aucun test** : Le projet ne contient ni tests unitaires ni tests d'integration.
- **Traduction lourde** : Le systeme multi-langue duplique l'integralite du HTML trois fois (une par langue), ce qui double la taille du DOM.
- **`makemigrations` en production** : Le script `entrypoint.sh` execute `makemigrations` avant `migrate`, ce qui est un anti-pattern en environnement de production.

---

## Ameliorations futures

- **Authentification OAuth 2.0** — Integration de l'authentification via l'API de l'ecole 42 pour simplifier l'inscription et la connexion.
- **WebSocket en temps reel** — Remplacer le polling HTTP par Django Channels pour les parties multijoueur en ligne synchronisees.
- **Refactor du modele de donnees** — Normaliser la base en separant les entites : `DuelResult`, `TournamentResult`, `Friendship`, `PlayerProfile`.
- **Tests unitaires et d'integration** — Couverture de code avec `pytest` et `pytest-django`.
- **CI/CD** — Pipeline d'integration continue (GitHub Actions) pour les tests automatiques et le deploiement.
- **Systeme de traduction** — Adopter `gettext` ou une solution JS legere au lieu de tripler le HTML.

---

## Equipe

| Membre | Role |
|--------|------|
| **Mathys** | Backend / Architecture |
| **Nil** | Frontend / Jeu |
| **Vincent** | Backend / Base de donnees |
| **Alex** | Frontend / Design |

---

## Licence

Ce projet est distribue sous la licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

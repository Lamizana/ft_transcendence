# Projet DJANGO avec SQL

## Création d'un projet Django avec  la base de donnée SQL.

## [1] Creer un répertoire et un environnement virtuel.

Créer le répertoire du projet:
```bash
> mkdir project
```

Dans ce répertoire creer un environnement virtuel:
```bash
> python3 -m venv .env
```

Activer l'environnement virtuel:
```bash
> source .env/bin/activate
```

## [2] Installer DJANGO.

```bash
> pip install Django
```

Stocke les packages installés au format requis, ils sont répertoriés dans un ordre trié.
```bash
> pip freeze > requirements.txt
```
## [3] Démarrer le projet Django.

Creation du projet: un seul projet contenant plusieurs applications:
```bash
> django-admin startproject transcendence .
```

Lancement du serveur:
```bash
> python3 manage.py runserver
```

- Affichage au lancement de Django:
```bash
Django version 5.0.4, using settings 'trance.settings'
Starting development server at http://127.0.0.1:8000/ <- adresse.
Quit the server with CONTROL-C.
```
- pour desactiver l'environement virtuel:
```bash
> deactivate
```
- Se connecter au navigateur:
	l'application est hébergé sur notre machine et non en ligne.

> python3 manage.py est la commande utilisée pour exécuter Django

- Se connecter au navigateur:
	l'application est hébergé sur notre machine et non en ligne.

----------------------------------------------------------------------------
## [4] Creation d'une image Docker.
Au niveau de manage.py créer un ficher *Dockerfile*
Créer aussi un fichier *.dockerignore*

- Construire l'image avec:
```bash
> docker build .
```
- Création du fichier *docker-compose.yml* au niveau du Dockerfile:
```bash
> docker-compose up
```
> notre serveur Django s'exécute dans un conteneur Docker autonome.

- Pour arreter le conteneur:
	- Ctrl-c
	- docker compose down

----------------------------------------------------------------------------
## [5] Créer la base de données PostgreSQL du projet.
Psycopg est l'adaptateur de PostgreSQL.
Rajouter dans *requirements.txt*:
```
psycopg[binary]==3.1.12
```
Création d'un conteneur **db** pour notre base de donnees PostgreSQL.
- Le webservice dépend du dbservice à exécuter, nous allons donc ajouter 
une ligne appelée ```depends_on``` pour le signifier.

- Mettre a jour la base de données dans *settings.py* au niveau ```DATABASE```

- S'assurer que les tables Django par défaut ont été créées :
```bash
$ docker-compose exec db psql --username=alex --dbname=pong_db
```

- Pour faire tourner les deux conteneurs en mode détaché avec une seule commande:
```bash
> docker-compose up -d --build
```
- Pour afficher les images qui tourne:
```bash
> docker images -a
```
- force l'arret et supprime toutes les images:
```bash
> docker images purge
```
### Utilisation de PostgreSQL
Vérification de container en route:
```bash
> docker ps
```
Se connecter en root a *postgreSQL* sur ligne de commande:
```bash
> docker exec -it container_name bash 
```
Pour accéder a *postgreSQL*
```bash
> su - postgres
> psql
psql (14.11 (Debian 14.11-1.pgdg120+2))
Type "help" for help.

postgres=# 
```
```bash
> \conninfo		# Affiche l'etat de la connexions.
> \l 			# liste la database.
> \dt			# liste les tables.
> \q			# quitte psql.
```
Permet d'acceder au éléments d'une table de la base de données:
```bash
> SELECT * FROM pong_client;
```
Arreter le conteneur avant de le supprimer:
```bash
> docker stop container_name
> docker rm container_name
```

## [6] Migrations:
	Une migration est un ensemble d'instruction permettent de passer le shema de
	notre base de donnees d'un etat à un autre.
	elles représente un moyen de configurer la base de données de notre application.

- Les commandes docker ne sont pas les memes que celle de Django:
- Pour créer notre base de données:
```bash
> docker compose exec web python3 manage.py migrate
```

*Permet de forcer une migration:*
```bash
docker compose exc web python3 manage.py migrate --fake APPNAME zero
```

- Création de notre application, ici pong:
```bash
> docker compose exec web python3 manage.py startapp pong
```

## [7] Creation d'un application 'PONG'.

```./pong``` est un repertoire d'application:
	- chaque répertoire d'application est spécifique à une application.
	- une application est une sous-section de votre projet entier.

- ```./apps``` est un répertoire de projet.
	contient l'ensemble du projet: c'est la tour de controle.

- Création de notre application, ici pong:
```bash
> docker compose exec web python3 manage.py startapp pong
```

- Pour installer l'application pong dans notre projet:
	aller dans ```website/setting.py```.
	rajouter 'pong' au debut de ```INSTALLED_APPS```.

- Pour crér un super utilisateur:
```bash
> docker compose exec web python3 manage.py createsuperuser
```

----------------------------------------------------------------------------
## [8] Gestion des vues.

Fichier **views.py** gere l'ensemble des vues avec le fichier **urls.py**:

- Une vue a pour fonction de répondre à la visite d'un utilisateur sur le site en 
renvoyant une page que l’utilisateur peut voir.


- Une vue est une fonction qui accepte un objet ```HttpRequest``` comme 
	  parametre et retourne un objet ```HttpResponse```.

```python
# ~/django/transcendence/pong/views.py

from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return HttpResponse('<h1>Hello Django!</h1>')
```
Le 1er paramètre de la fonction est une variable contenant l'objet ```HttpRequest```.
Par convention nous le nommons toujours```request```
La valeur de retour de la fonction est toujours un ```objetHttpResponse```. 

----------------------------------------------------------------------------
## [7] Mise en place des modéles.
**LES MODELES URL**: urls.py 

- Un modele définit les caractéristiques que nous voulons stocker.
- Les caractéristique sont définit par des champs.
- Un modéle permet d'avoir une mémoire persistante.
- Importation de l'élément view dans **urls.py**:
```python
# ~/django/transcendence/pong/urls.py

from django.contrib import admin
from django.urls import path
from pomg import views

urlpatterns = [
path('admin/', admin.site.urls),
path('index/', views.index)
]
```
> [!NOTE]
> Un modèle d'URL, c’est la façon dont nous indiquons à Django qu'il doit être à l'écoute
> d'une requête pour une URL donnée, puis appeler une vue spécifique pour générer une page.

----------------------------------------------------------------------------

**LES MODELES PYTHON**: models.py

- Un modéle définit les caractéristiques que nous voulons stocker.
 - Cest caratéristique sont nommées **champs**.
 - id sert de **clé primaire**: 1 identifient *unique pour chaque table.
 - La structure d' une base de données est appelé *shéma*.

- Pour changer l'état de notre base de données nous utilison une migration:
	- ensmble d'einstructions.
	
- Ajouter d'abord le models dans **models.py**:
```python
# ~/django/transcendence/pong/models.py

class Player(models.Model):
    name = models.fields.CharField(max_length=100)
```
Définit une Classe nommée Player et l'avons fait hériter de models.
Model est la classe de base du modèle de Django.
- Creer le modele:
```bash
> docker compose exec web python3 manage.py makemigrations
```

- le mettre à jour:
```bash
> docker compose exec web python3 manage.py migrate
```
- Pour crér un **super utilisateur**:
```bash
> docker compose exec web python3 manage.py createsuperuser
```
Pour avoir la Class Player sur admin:
```python
# ~/django/transcendence/pong/admin.py

from pong.models import Player
admin.site.register(Player)
```
Permet de forcer une migration:
```bash
docker compose exc web python3 manage.py migrate --fake APPNAME zero
```

**- Commandes pour la base de données dans le shell de Django**

Lancement de python avec :
```bash
> docker compose exec web python3 manage.py shell
```
Pour travailler avec le group Client:
```python
>>> from pong.models import Player
```
Pour rajouter un element dans le groups Band:
```python
>>> player = Player.objects.create(name='Foo Fighters')
```
Pour récupérer un objet grace a son id:
```python
>>> player = Player.objects.get(id=1)
>>> client.name
```
Pour voir tous les objet du group Band:
```python
>>> Player.objects.all()
```
Pour savoir combien d'element il y a dans le groupe:
```python
>>> Player.objects.count()
```
Pour supprimer le 1re element du group Player:
```python
>>> tmp = Player.objects.get(id=1)
>>> tmp.delete()
```
Pour supprimer tout les elements du group Player:
```python
>>> tmp = Player.objects.all()
>>> tmp.delete()
```

----------------------------------------------------------------
### Mettre a jour view.py:
```python
from django.shortcuts	import render
from django.http        import HttpResponse
from pong.models        import Player

def index(request):
    player = Player.objects.all()
    return render(request, 'pong/log/log.html',{'players': players})
```
> render prend plusieurs parametres.

```'pong/log/log.html'``` est le chemin du fichier.html a récupérer.

Nous appelons le troisième argument un « dictionnaire de contexte ».
```'players':playsers``` permet de recupérer tous les objects de Bands.

---------------------------------------------------------------------------
## [8] Mise en place des TEMPLATES / GABARITS.
Affiche et recueille les données.

### Creation d' un fichier HTML: 

- pong/template/pong/log/log.html:

Le but va etre de séparer le HTML valable pour l'ensemble du site du HTML spécifique à la page.

### Creation d'un gabarit de base pour eviter les répétitions:
    
    -pong/template/pong/base.html

La balise ```{% block %}``` est un espace réservé dans lequelle on peut y placer
du contenue, elle se termine par ```{% endblock %}```
Notre block ici s'appelle **content**.

Notre gabarit de base est l'endroit idéal pour charger un fichier CSS
en utilisant la balise de gabarits ```static```.

----------------------------------------------------------------
### Mise en place du gabarit dans chaque fichier.html:
Pour chaque fichier.html qui se servira de la base, mettre au debut:
```python
{% extends 'pong/base.html' %}
{% block content %}
<ul>
<h1>Hello Django !</h1>
...
</ul>

{% endblock %}
```
Les instructions ```{%...%}``` sont des ***balises de gabarits***.

pour itérer sur une liste dans un modéle:
```html
# pong/template/pong/log/log.html

<p>Les joueurs sont :</p>
<ul>
    {% for player in players %}
    <li>{{ player.name }}</li>
    {% endfor %}
</ul>
```

- Instruction "if" dans un gabarit:
```html
<p>
	Il y a 
    {% if players|length == 0 %}
        pas de 
    {% elif players|length == 1 %}
        q'un seul
    {% else %}
        beaucoup de
    {% endif %}
        players.
</p>
```
----------------------------------------------------------------
### Utilisation des filtre de gabarits:
Permet d'appliquer un certains formatage.
```html
<li>{{ client.name|upper }}</li>  -> Met le nom en majuscule.
``` 
```html
<li>{{ client.name|length }}</li> -> Donne la longueur du nom.
```

----------------------------------------------------------------
### Donner un style CSS:

Les ficchiers Css sont appele fichiers ***statiques***.
Creation d'un dossier:
```bash
pong/static/pong
touch log.css
```

----------------------------------------------------------------
### Récapitulatif de l'architecture MVT:
Voici les trois principaux composants de l'architecture MVT:
- M: les modeles.
- V: les vues.
- T les templates.


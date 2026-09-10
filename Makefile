# Creer les images et lances les conteneurs:
all: 
	docker compose up --build 
	
# Initialise le projet ainsi ques ses volumes et migrations:
create: all makemigrations migrate admin

debug: 
	docker compose -f docker-compose.yml up --build
# Arret temporaire les conteneurs:
stop:
	docker compose -f docker-compose.yml stop

# Redemarrage des conteneurs:
start:
	docker compose -f docker-compose.yml start

# Arret complet de l'application:
down:
	docker compose -f docker-compose.yml down

# ReBuild de l'application:
re: down all
	
# Arret total de l'application et suppression de toutes les images et volumes:
clean:
	docker compose -f docker-compose.yml down -v

# Destruction de tous les conteneurs existants:
fclean: clean
	docker system prune -af


####################### COMMANDES #######################
# Accede au shell de python:
python:
	docker-compose exec web python3 manage.py shell

# Accede au shell de psql:
psql:
	docker exec -it db bash
# su - postgtres
# psql

# Genere une migration:
makemigrations:
	docker compose exec web python3 manage.py makemigrations

# Fait une migration:
migrate: 
	docker compose exec web python3 manage.py migrate

admin:
	docker compose exec web python3 manage.py createsuperuser
	
.PHONY: all stop start down re clean fclean python psql makemigrations migrate admin

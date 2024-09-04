# Recuperer l'image officielle de base:
FROM python:3

# Definit le repertoire de travail:
WORKDIR /usr/src/apps

# Definit les variables d'environement:
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Installer les dependances:
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# install system dependencies
RUN apt-get update && apt-get install -y netcat-traditional

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN chmod +x /usr/src/apps/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/apps/entrypoint.sh"]

# nginx/Dockerfile
FROM nginx:latest

# Installer OpenSSL pour générer les certificats SSL
RUN apt-get update && apt-get install -y openssl

# Créer les répertoires pour les certificats et la configuration Nginx
RUN mkdir -p /etc/nginx/ssl 

# Générer les certificats SSL autofinancés
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt \
    -subj "/CN=localhost"

COPY nginx.conf /etc/nginx/nginx.conf

CMD [ "nginx", "-g", "daemon off;" ]
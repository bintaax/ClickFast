# Utilisation d'une image de base Node.js
#FROM node:18

# Création du répertoire de travail dans le conteneur
#WORKDIR /app

# Copie des fichiers du projet dans le conteneur
#COPY package*.json ./

# Installation des dépendances
#RUN npm install

# Copie du reste des fichiers dans le conteneur
#COPY . .

# Exposition du port utilisé par l'application
#EXPOSE 3000

# Commande pour démarrer l'application
#CMD ["npm", "start"]


# Utilise l'image Nginx Alpine, petite et sécurisée
FROM nginx:alpine

# Copie le fichier index.html, style.css et script.js de la racine de votre projet local 
# vers le répertoire par défaut de Nginx dans le conteneur.
# Le point '.' sur la gauche représente la racine de votre contexte de build (là où se trouve le Dockerfile).
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Si vous avez d'autres ressources (images, dossiers CSS/JS),
# vous pouvez les copier aussi :
# COPY images/ /usr/share/nginx/html/images/ 
# COPY assets/ /usr/share/nginx/html/assets/ 

# Le port 80 est le port par défaut de Nginx
EXPOSE 80 

# Nginx démarre automatiquement comme la commande par défaut de l'image de base.
# Pas besoin de spécifier de CMD ici.
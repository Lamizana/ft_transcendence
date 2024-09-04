# AVANCEMENT

> Mathys - Nil - Vincent - Alex // 15 Mai 2024 // 

### SOMMAIRES:
1. [Regles de bases.](#regles-de-bases) 
2. [Web.](#web) 
3. [Gestion Utilisateur et Authentification.](#gestion-utilisateur-et-authentification)  
4. [Gameplay et Experience utilisateur.](#gameplay-et-experience-utilisateur)  
5. [IA-Algo.](#ia-algo)  
6. [Cybersécurite.](#cybersecurite)
7. [DevOps.](#devops)
8. [Graphiques.](#graphiques)
9. [Accessibilité.](#accessibilite)
9. [Orienté Objet.](#oriente-objet)

-------------------------------------------------------------------------------
## REGLES DE BASES.

- [ ] : Implementer une connexion HTTPS.
- [ ] : Protection contre les injections SQL/XSS.
- [ ] : Tout mot de passe dans la base de données doit etre chiffré.
- [ ] : Les informations doivent etre dans un fichier .env et ignoré par Git.

-------------------------------------------------------------------------------
## WEB
#### Intégration de fonctionnalités web avancées.

- [x] **Module majeur:** *// Alex //*
    - Utliser le framework ***Django*** en Back-end.
>
- [x] **Module mineur:** *// Alex //*
    - Utliser le framework ***Bootstrap*** en Front-end.
>
- [x] **Module mineur:** *// Alex //*
    - Utiliser ***Postgres*** comme base de données.
>
- [ ] **Module majeur:**
    - Stocker les points du tournoi dans la ***Blockchain***.
        - Blockhain: ***Etherum***.
        - Langage: ***Solidity***.

-------------------------------------------------------------------------------
## GESTION UTILISATEUR ET AUTHENTIFICATION.

- [ ] **Module majeur:** Gestion utilisateur. *// Mathys //* 
    - [ ] : Peut s'inscrire au site de maniere ***sécuritaire***.
    - [ ] : Si il est enregistrés peux ***s'authentifier de maniere sécuritaire***.
    - [ ] : Peut choisir un ***pseudo unique*** pour le tournoi.
    - [x] : Peut mettre a jour ses informations.
    - [ ] : Peut téléverser un ***avatar***, sinon avatar par défault.
    - [ ] : Peut ajouter d'autres joueurs comme amis et voir leur status.
    - [x] : Le profil affiche les statistiques (victoires, défaites).
    - [x] : Chaque joueur a un ***Historique des partie*** accesssible 
    au joueurs authentifiés.
>
- [ ] **Module majeur**: Implémenter une authentification à distance.
- Implémenter le systeme d'authentification ```OAuth 2.0 authentication with 42```
    - [ ] : Accés au site en toute sécurité.
    - [ ] : Obtenir les infos et permission nécessaire pour activer l'authentification.
    - [ ] : Mettre en place les flux de connections et d'autorisations.
    - [ ] : Assurer l'échange sécurisée des tokens d'authentification entre 
    l'application et le fournisseur d'authentification.

-------------------------------------------------------------------------------
## GAMEPLAY ET EXPERIENCE UTILISATEUR.
#### Améliore l'aspect général de la jouabilité.

- [ ] **Module majeur:** *// Mathys et Vincent//* 
    - Joueurs a distance sur ordinateurs différents.
>
- [ ] **Module majeur:** *// Vincent //*
    - Plus de 2 joueurs sur le plateau. Possibilite de choisir 1 nombre uniques
    de joueurs. ex: 4 joueurs.
>
- [ ] **Module majeur:** 
    - [ ] : Ajout d'un second jeu.
    - [ ] : Gestion historique des parties.
    - [ ] : System de ***matchmaking***.
    - [ ] : ***Données sécurisées*** et mise a jour.
    - [ ] : Optimiser la perfomance.
>
- [ ] **Module mineur:** Option de personnalisation du jeu.
    - [ ] : ajout de fonctionnalités comme des bonus ou des cartes.
    - [ ] : le joueur peut choisir une version par défault du jeux.
    - [ ] : Les options de personalisation s'appliquent sur tous les jeux.
    - [ ] : Implémenter un **menu de réglage**.
>
- [ ] **Module majeur:** Systéme de **Chat** en direct.
    - [ ] : Le joueur doit pouvoir envoyer des **msg direct** a d'autres joueurs.
    - [ ] : Le joueur peux en bloquer d'autres.
    - [ ] : Il doit pouvoir inviter d'autres joueurs a jouer a partir du Chat.
    - [ ] : Le systeme de tournoi avertit les joueurs qui sont attendu pour la partie.
    - [ ] : Le joueur peux accéder au profil d'autres joueurs a partir du Chat.

-------------------------------------------------------------------------------
## IA-ALGO.
#### Création d'adversaire controlé par IA ainsi qu'un Tableau de Bord.

- [ ] **Module majeur:** Adversaire controlé par IA. *// Vincent //* 
    - [ ] : Créer une IA cohérente avec le jeux.
    - [ ] : Elle doit reproduire un comportement humain (rafraichissement: 1/seconde).
    - [ ] : Implementer sa logique et son processus de décision.
    - [ ] : Créer un IA efficace sans utiliser ```A*```.
    - [ ] : Elle doit pouvoir gagner des parties.
>
- [x] **Module mineur:** Tableau de bord utilisateur et statistiques. *// Mathys //* 
    - [x] : Créer des tableaux de bords avec statistique utilisateurs.
    - [x] : Développer un tableau de bord séparé pour les sessions de jeux.
    - [x] : Implementer differentes facon de visualiser les données (chartes, graphique). 
    - [x] : Le joueurs peut acceder a son historique de jeux.
    
-------------------------------------------------------------------------------
## CYBERSECURITE. 

- [ ] **Module majeur:** *// Nil //*
    - [ ] : Configurer un pare-feux d'app web ```WAF``` ou ```ModSecurity```
    - [ ] : Integrer ```HashiCorp Valut``` pour gérer et stocké les informations.
>
- [ ] **Module mineur:** *// Nil //*
    - [ ] : Implementer les options de conformité ***RGPD*** pour l'anonymisation.
    - [ ] : Processus de suppression permanant de compte.
    - [ ] : politique de confidentialité claire et transparente.
>
- [ ] **Module majeur:** *// Nil //*
    - [ ] : Implémenter l’authentification à 2 facteurs ***(2FA)*** pour les comptes.
    - [ ] : Utiliser ```JSON Web Tokens``` (JWT) comme méthode d’authentification.
    - [ ] : Interface de configuration pour l'activation du ***2FA*** avec option (code SMS).
    - [ ] : S’assurer que les jetons ***JWT*** sont émis et validés de manière sécurisée

-------------------------------------------------------------------------------
## DEVOPS.

-------------------------------------------------------------------------------
## GRAPHIQUES.

- [ ] **Module majeur:** Implémentation de techniques 3D avancées.
    - Implementer la 3D avec ```ThreeJS/WebGL```

-------------------------------------------------------------------------------
## ACCESSIBILITE.

- [ ] **Module mineur:** Support sur tout type d’appareils. *// Mathys //*
    - [x] : Support sur toute les tailles d'écrans.
    - [ ] : Navigation et interaction avec differents mode de saisie (tactile, clavier).
>
- [ ] **Module mineur:** Etendre la compatibilité des navigateurs web. *// Mathys-Alex //*
    - [ ] : Inclure un navigateur Web suplémentaire.
    - [ ] : S'assurer du confort utilisateur sur les différents navigateurs.
>
- [ ] **Module mineur:** Supprot multi-langues. *// Mathys //*
    - [x] : Implementer un minimum de ***3 langues***.
    - [x] : Sélection de langues et affichage facile sur le site.
    - [x] : traduit l'essentiel du contenue web.
    - [x] : Navigation sur le site opérationnel quelque soit la langue.
    - [ ] : Possibilité de choisir une langue par défault pour les prochaines visites.
>
- [ ] **Module mineur:** 
    - Ajout de l’accessibilité pour les utilisateurs malvoyants.
>
- [ ] **Module mineur:**
    - Intégration du rendu côté serveur ```SSR```
    
-------------------------------------------------------------------------------
## ORIENTE OBJET.

- [ ] **Module majeur:**
- Remplacer le jeu Pong par un jeu Pong côté serveur, accompagné de la mise en place d’une API.
    - [ ] : Devolopper le gameplay du jeux coté serveur.
    - [ ] : Créer un ***API*** qui expose les ressources pour intéragir avec le jeux.
    - [ ] : Concevoir et mettre en place les points d’accès de l’API.
    - [ ] : Intégrez le jeu Pong côté serveur avec l’application web.
>
- [ ] **Module majeur:** 
- Activation du gameplay de Pong via l’interface en ligne de commande (CLI) contre les 
utilisateurs web avec intégration d’API.
    - [ ] : Création d'une application CLI qui reproduit le jeux.
    - [ ] : Utilisation de l'API pour établir une communication entre la CLI et l'application.
    - [ ] : Développer un mécanisme d’authentification sécurisé des utilisateurs au sein de la CLI.
    - [ ] : Synchronisation en temps réel entre la CLI et les utilisateurs web.
    - [ ] : Rejoindre créer des parties de Pong avec les joueurs web.
    - [ ] : Fournir une doc complete sur l'utilisation de la CLI.

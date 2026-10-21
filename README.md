# SoFeed React

SoFeed est un projet de réseau social réalisé avec React. Il affiche un fil de publications récupérées depuis l'API publique [DummyJSON](https://dummyjson.com/).

## Prérequis

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20.19 ou supérieur (ou 22.12 ou supérieur)
- npm, fourni avec Node.js
- Une connexion Internet pour accéder à l'API DummyJSON

## Installation et lancement

Depuis un terminal, clonez le dépôt puis placez-vous dans le dossier de l'application :

```bash
git clone https://github.com/YDogny/projetReact.git
cd projetReact/react-project
npm install
npm run dev
```

Ouvrez ensuite dans votre navigateur l'adresse locale indiquée par Vite dans le terminal.

## Configuration

L'application utilise la variable d'environnement `VITE_API_URL` pour connaître l'adresse de l'API. Dans le dossier `react-project`, créez un fichier `.env` contenant :

```env
VITE_API_URL=https://dummyjson.com/posts
```

Le fichier `.env` est ignoré par Git ; il n'est pas nécessaire de le publier. Après toute modification de cette variable, redémarrez le serveur de développement.

## API et choix techniques

- **API :** DummyJSON, endpoint `https://dummyjson.com/posts`.
- **Interface :** React avec des composants fonctionnels et des hooks (`useState`, `useEffect`).
- **Outil de développement et de build :** Vite.
- **Styles :** CSS et CSS Modules pour certains composants.
- **Qualité du code :** Oxlint.

## Fonctionnalités réalisées

- Récupération des publications depuis DummyJSON.
- Affichage du titre, du texte, des tags, des réactions et du nombre de vues.
- Affichage des états de chargement et des erreurs de récupération.

## Limites et fonctionnalités non réalisées

- Les pages de profil utilisateur et l'affichage de toutes les publications d'un utilisateur ne sont pas encore implémentés.
- La création, la modification et la suppression de publications ne sont pas disponibles.
- L'application dépend de la disponibilité de DummyJSON et d'une connexion Internet.
- Aucun lien de déploiement n'est disponible pour le moment.

## Vérifications

Depuis le dossier `react-project`, vous pouvez lancer :

```bash
npm run lint
npm run build
```

## Outils d'IA utilisés

- **ChatGPT :** aide à comprendre les consignes et le code, explications, commentaires et assistance à la programmation.
- **Stitch :** exploration d'une proposition de direction visuelle pour un réseau social avec un fil de publications et des profils.
- **GiHub Copilot :** style du site, réalisation du README, aide pour le reperage et la correction des bugs.

## Dépôt

[github.com/YDogny/projetReact](https://github.com/YDogny/projetReact)




## Livrables

Le projet doit être déposé sur GitHub. Le lien du dépôt doit être rendu sur Cesar.

Le dépôt doit contenir le code source et un README précisant :

- Le sujet du projet et l'API utilisée ;
    (reseau social avec post et users, DummyJSON)

- Les prérequis et les commandes d'installation et de lancement ;
    (git clone https://github.com/YDogny/projetReact.git, cd react-porject, npm install, npm run dev)

- La configuration nécessaire, notamment les éventuelles variables d'environnement ;
    (pas compris et je sais pas)

- Les principaux choix techniques et les bibliothèques utilisées ;

- Les fonctionnalités réalisées, les bonus et les limites ou problèmes connus ;

- Les outils d'IA utilisés et leurs usages, ou l'absence d'utilisation de l'IA ;
    (ChatGPT faire un exo, m'explique, mettre des commentaires, coder)
    
    stitch : A social media  with posts and users (the datas will come from dummyJSON) i want something pofessional without too much things on the screen (for the index , all the post like one under the others and when i clik on the name i kan see is profil with every post i ever did)


- Le lien de l'application déployée, si vous réalisez le bonus de publication.
    ()


Le projet doit pouvoir être installé et lancé en suivant uniquement les instructions du README.


# SoFeed React

SoFeed est une application de réseau social réalisée avec React. Elle affiche un fil de publications provenant de l'API [DummyJSON](https://dummyjson.com/), avec une page de détail pour chaque publication et un formulaire de création.

## Prérequis

- Git
- Node.js 20.19 ou supérieur, ou 22.12 ou supérieur
- npm
- Une connexion Internet pour accéder à DummyJSON

## Installation et lancement

Depuis un terminal, clonez le dépôt et placez-vous dans le dossier de l'application :

```bash
git clone https://github.com/YDogny/projetReact.git
cd projetReact/react-project
npm install
npm run dev
```

Ouvrez ensuite l'adresse locale indiquée par Vite dans le terminal.

## Configuration

Dans `react-project`, créez un fichier `.env` avec les variables suivantes :

```env
VITE_API_URL=https://dummyjson.com/posts
VITE_API_IMG=https://dummyjson.com/image/400x200/008080/ffffff?text=
```

`VITE_API_URL` définit l'URL de l'API des publications. `VITE_API_IMG` définit l'URL de base des images affichées dans le fil. Le fichier `.env` est ignoré par Git. Redémarrez le serveur de développement après toute modification de ces variables.

## Fonctionnalités

- Chargement et affichage des publications, avec titre, contenu, tags, réactions et nombre de vues.
- États de chargement et affichage des erreurs de récupération.
- Page de détail accessible depuis chaque publication.
- Formulaire pour créer une publication avec un titre, un contenu et des tags.
- Navigation vers les pages d'accueil et des favoris.

L'API de DummyJSON simule la création d'une publication : elle apparaît dans le fil courant, mais n'est pas enregistrée durablement par l'API. La page des favoris, les profils utilisateurs et les fonctions de modification ou de suppression ne sont pas implémentés. L'application nécessite une connexion Internet et dépend de la disponibilité de DummyJSON. Aucun lien de déploiement n'est disponible pour le moment.

## Choix techniques

- React avec des composants fonctionnels et des hooks (`useState`, `useEffect`).
- React Router pour la navigation.
- Vite pour le développement et la compilation.
- CSS et CSS Modules pour les styles.
- Oxlint pour l'analyse du code.

## Vérifications

Depuis le dossier `react-project`, exécutez :

```bash
npm run lint
npm run build
```

## Outils d'IA utilisés

- **ChatGPT :** aide à comprendre les consignes et le code, explications, commentaires et assistance à la programmation.
- **Stitch :** exploration d'une proposition de direction visuelle pour un réseau social avec un fil de publications et des profils.
- **GitHub Copilot :** aide au style du site, à la rédaction du README, au repérage et à la correction des bugs, petit accident lors de son utilisation(modification integrale de la structure par accident).

## Dépôt

[github.com/YDogny/projetReact](https://github.com/YDogny/projetReact)

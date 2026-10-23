# SoFeed React

Application de réseau social réalisée avec React et Vite, basée sur l'API publique [DummyJSON](https://dummyjson.com/). Le projet est actuellement fonctionnel en local et couvre le cœur d'un fil d'actualité : lecture, recherche, filtres, pagination, favoris persistants et création de publication.

## Statut actuel

Le projet est en état de MVP fonctionnel.

Fonctionnalités actuellement implémentées :
- fil d'actualité avec cartes de publication
- page de détail pour chaque publication
- recherche textuelle
- filtres par tag et nombre minimum de likes
- pagination sur les résultats filtrés
- gestion des favoris avec persistance dans le localStorage
- formulaire de création de publication avec validation côté client
- navigation entre accueil, favoris et détail via React Router
- interface responsive et chargement/erreurs gérés

Ce qui n'est pas encore inclus dans l'état actuel :
- mise à jour/suppression d'une publication via CRUD complet
- profil utilisateur dédié
- dark mode
- déploiement public en ligne

## Stack technique

- React 19
- Vite
- React Router
- CSS Modules
- DummyJSON API
- Oxlint pour la qualité de code

## Prérequis

- Node.js 20.19+ ou 22.12+
- npm
- connexion Internet pour l'API DummyJSON

## Installation

Depuis le dépôt racine :

```bash
git clone https://github.com/YDogny/projetReact.git
cd projetReact/react-project
npm install
```

## Configuration

Créez un fichier `.env` dans `react-project` :

```env
VITE_API_URL=https://dummyjson.com/posts
VITE_API_IMG=https://dummyjson.com/image/400x200/008080/ffffff?text=
```

Variables :
- `VITE_API_URL` : base de l'API des publications
- `VITE_API_IMG` : URL utilisée pour générer les visuels de publication

Le fichier `.env` est ignoré par Git.

## Lancement

```bash
npm run dev
```

Ouvrez ensuite l'URL locale affichée par Vite dans le terminal.

## Vérification du projet

```bash
npm run lint
npm run build
```

La validation actuelle passe sans erreur.

## Notes fonctionnelles

- Les publications créées via le formulaire apparaissent dans l'interface immédiatement, conformément au comportement simulé par DummyJSON.
- Les favoris sont conservés dans le navigateur grâce au `localStorage`.
- L'application dépend de la disponibilité de l'API DummyJSON et de la connexion Internet.
- Aucun déploiement public n'est configuré pour le moment.

## Dépôt

https://github.com/YDogny/projetReact

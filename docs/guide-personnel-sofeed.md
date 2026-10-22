# Guide personnel — comprendre SoFeed React

Ce guide explique le fonctionnement de l'application, où se trouve chaque partie du code et ce qui a changé lors du refactoring des composants de publications. Il complète le [README](../README.md), qui contient les instructions courtes d'installation.

## 1. Vue d'ensemble

SoFeed est une application React qui récupère des publications depuis DummyJSON et les affiche dans un fil. On peut ouvrir le détail d'une publication et envoyer une nouvelle publication à l'API. La page Favoris existe dans la navigation, mais son contenu n'est pas encore développé.

Le trajet général est le suivant :

```text
Navigateur
  └─ src/main.jsx : démarre React et active le routage
       └─ src/App.jsx : affiche l'en-tête, la page correspondant à l'URL et le pied de page
            ├─ pages/Feed/Feed.jsx : charge et affiche le fil
            ├─ pages/DetailsPost/DetailsPost.jsx : charge le détail d'une publication
            └─ pages/Favoris/Favoris.jsx : page actuelle vide
```

Les pages assemblent les composants et gèrent leur comportement. Les composants réutilisables affichent des morceaux d'interface. Les fonctions dans `api/` communiquent avec le serveur, et celles dans `features/posts/` préparent les données liées aux publications.

## 2. Où se trouve quoi ?

Tout le code de l'application se trouve dans `react-project/`. Les chemins ci-dessous sont relatifs à ce dossier.

| Fichier ou dossier | Rôle |
|---|---|
| `src/main.jsx` | Point d'entrée : crée l'application React, active `BrowserRouter` et charge les styles globaux. |
| `src/App.jsx` | Cadre commun de l'application et définition des routes. |
| `src/api/postsApi.js` | Requêtes HTTP DummyJSON pour lister, lire et créer des publications, ainsi que l'URL des images. |
| `src/features/posts/normalizePost.js` | Donne aux publications un format cohérent et complète les valeurs manquantes. |
| `src/pages/Feed/Feed.jsx` | État et logique du fil : chargement, erreurs, publications et formulaire. |
| `src/pages/Feed/Feed.module.css` | Styles propres à la page du fil, réutilisés également par le détail. |
| `src/pages/DetailsPost/DetailsPost.jsx` | Récupère et affiche une publication précise. |
| `src/pages/Favoris/Favoris.jsx` | Page de favoris actuellement vide, mais toujours accessible par sa route. |
| `src/components/Posts/PostCard.jsx` | Carte visuelle réutilisable pour une publication. |
| `src/components/Posts/Posts.module.css` | Styles des cartes de publication. |
| `src/components/Posts/PostSkeleton.jsx` | Faux blocs affichés pendant le chargement du fil. |
| `src/components/Posts/PostSkeleton.module.css` | Styles et animation des blocs de chargement. |
| `src/components/FabForm/FabForm.jsx` | Formulaire de création d'une publication et validations côté interface. |
| `src/components/FabForm/FabForm.module.css` | Styles du formulaire. |
| `src/components/Header/` | En-tête, logo et liens Accueil/Favoris. |
| `src/components/Footer/` | Pied de page. |
| `src/assets/` | Images et logos importés par l'application. |
| `src/index.css` et `src/App.css` | Règles CSS globales et structure générale de la page. |
| `.env` | Variables locales d'URL pour l'API et les images ; ce fichier est ignoré par Git. |
| `package.json` | Dépendances et commandes npm (développement, lint, build, preview). |

## 3. Démarrage et navigation

### `src/main.jsx` : le démarrage

`main.jsx` est le véritable point de départ. React monte l'application dans l'élément HTML `#root`. `BrowserRouter` permet ensuite de changer de page selon l'URL, sans recharger entièrement le site.

`StrictMode` est une aide de React pour repérer certains problèmes pendant le développement. En mode développement, il peut notamment exécuter certains effets plus d'une fois pour mettre en évidence des effets secondaires ; ce n'est pas une requête supplémentaire prévue par la logique normale du site.

### `src/App.jsx` : le cadre et les routes

`App` affiche toujours le `Header` et le `Footer`. Entre les deux, React Router choisit une page selon le chemin :

- `/` affiche `Feed`.
- `/favoris` affiche `Favoris`.
- `/detail/:id` affiche `DetailsPost`, où `:id` est l'identifiant de la publication.

Le logo et le lien Accueil du `Header` reviennent au fil. Le lien Favoris mène à `/favoris`.

## 4. Le fil d'actualité, de la requête à l'écran

### Chargement des publications

Quand `Feed` s'affiche, son `useEffect` appelle `fetchPosts()` dans `postsApi.js`. Pendant la requête, `loading` vaut `true` et `PostSkeleton` présente des cartes grises animées pour donner un repère visuel.

Quand la réponse arrive, chaque élément est transformé par `normalizePost()`, puis stocké dans l'état React `posts`. La page s'affiche de nouveau et remplace les faux blocs par un `PostCard` pour chaque publication.

Le fil gère plusieurs situations :

- **Chargement :** squelette visuel et indication destinée aux technologies d'assistance.
- **Erreur :** message d'erreur, annoncé comme une alerte.
- **Réponse vide :** message indiquant qu'il n'y a rien à afficher.
- **Succès :** liste des cartes.

L'effet de chargement utilise un indicateur `cancelled` dans son nettoyage. Si la page est quittée avant la fin de la requête, le résultat tardif n'essaie pas de mettre à jour l'état de cette page.

### Préparation des données

`normalizePost()` rend les réponses plus prévisibles pour les composants d'affichage. Elle conserve l'identifiant, le titre, le contenu, les tags, les réactions, les vues et l'identifiant utilisateur. Pour les informations absentes, elle applique des valeurs de repli, par exemple un titre inconnu, des tableaux de tags vides et zéro réaction.

La propriété `img` est construite à partir de `VITE_API_IMG` et de l'identifiant utilisateur. Le composant de carte n'a ainsi pas besoin de connaître la façon dont cette URL est fabriquée.

### Carte de publication

`PostCard` reçoit une publication via sa propriété (`prop`) `post`. Elle affiche l'avatar, « Utilisateur » suivi de l'identifiant, le titre, le texte et, lorsqu'il y en a, les tags.

Deux options permettent de réutiliser la même carte dans deux contextes :

- `showDetailsLink` vaut `true` par défaut : la carte du fil affiche « Voir plus ».
- `showMetrics` vaut `false` par défaut : les réactions et les vues ne sont pas montrées dans le fil.

Sur la page de détail, ces options sont inversées : le lien devient inutile puisqu'on s'y trouve déjà, et les métriques sont affichées.

## 5. Ouvrir le détail d'une publication

Cliquer sur « Voir plus » ouvre une URL telle que `/detail/7`. La route transmet l'identifiant dans l'URL.

`DetailsPost` lit cet identifiant avec `useParams()`, puis appelle `fetchPostById(id)`. Comme pour le fil, cette page gère le chargement, l'erreur et le cas où aucune publication n'est disponible. La réponse passe par `normalizePost()` avant d'être rendue avec `PostCard`.

Le lien « Retour au fil d'actualité » permet de revenir à l'accueil.

## 6. Créer une publication

Le formulaire `FabForm` est affiché au bas du fil. Ses champs sont contrôlés par React : `title`, `body` et `tags` sont conservés dans l'état du composant à chaque saisie.

À l'envoi :

1. Le formulaire empêche le rechargement normal de la page.
2. Il vérifie que le titre et le contenu ne sont pas vides après suppression des espaces de début et de fin.
3. Il découpe les tags sur les virgules, enlève les espaces inutiles, supprime les valeurs vides et les doublons.
4. Il appelle la fonction `onPostCreated` fournie par `Feed`.
5. `Feed` envoie les champs à `createPost()` dans `postsApi.js` par une requête HTTP `POST`.
6. Si la requête réussit, la réponse est normalisée et ajoutée au début de la liste affichée.
7. Le formulaire est vidé, un message de succès apparaît et la page remonte vers le fil.

Pendant l'envoi, le bouton est désactivé et son libellé indique que la publication est en cours. Une erreur d'envoi apparaît dans le formulaire.

**À retenir :** DummyJSON est un service de démonstration. Il répond à la création, ce qui permet d'ajouter la publication dans le fil actuellement affiché, mais il ne la sauvegarde pas durablement. Après un rechargement, cette nouvelle publication peut donc disparaître.

## 7. API et configuration

`src/api/postsApi.js` regroupe les accès réseau au lieu de mettre les `fetch()` directement dans les composants :

- `fetchPosts()` demande la collection à `VITE_API_URL`.
- `fetchPostById(id)` demande `VITE_API_URL/<id>`.
- `createPost(data)` envoie les données à `VITE_API_URL/add`.
- `getUserImageUrl(userId)` fabrique l'adresse de l'image utilisée par `normalizePost()`.

Une réponse HTTP qui n'est pas réussie provoque une erreur explicite. Les pages et le formulaire peuvent alors montrer un message au lieu de faire comme si l'action avait réussi.

Dans le fichier `.env` de `react-project`, les variables attendues sont :

```env
VITE_API_URL=https://dummyjson.com/posts
VITE_API_IMG=https://dummyjson.com/image/400x200/008080/ffffff?text=
```

Les variables préfixées par `VITE_` sont accessibles au code exécuté dans le navigateur. Elles servent à configurer des URL publiques, pas à stocker des secrets. Le fichier `.env` local n'est pas publié dans le dépôt.

## 8. Styles et accessibilité

Les fichiers `*.module.css` contiennent des styles locaux à un composant ou une page : par exemple, `styles.post` dans `PostCard.jsx` correspond à une classe CSS du module de cartes. Cela réduit les collisions accidentelles entre noms de classes.

`index.css` et `App.css` sont globaux : ils règlent notamment les marges de base et la structure verticale de l'application. `PostSkeleton.module.css` adapte le squelette aux petits écrans et désactive l'animation si l'utilisateur préfère réduire les mouvements.

Le code utilise aussi des éléments et attributs destinés à l'accessibilité : des libellés de champs, `role="alert"` pour les erreurs, `role="status"` pour les informations d'état, et un texte masqué visuellement pour signaler le chargement du fil.

## 9. Ce qui a changé lors du refactoring

Le refactoring est dans le commit **« Refactoriser les composants de posts »** (`df03914`), intégré à `main` par la fusion `4c32af8`. Il s'agit principalement d'un **déplacement de composants réutilisables**, pas d'une réécriture du fonctionnement des publications.

| Avant | Après | Changement |
|---|---|---|
| `src/features/posts/PostCard.jsx` | `src/components/Posts/PostCard.jsx` | Déplacé vers le dossier des composants d'interface. Son import de `Posts.module.css` est devenu local au dossier (`./Posts.module.css`). |
| `src/features/posts/PostSkeleton.jsx` | `src/components/Posts/PostSkeleton.jsx` | Déplacé sans changement de contenu. |
| `src/features/posts/PostSkeleton.module.css` | `src/components/Posts/PostSkeleton.module.css` | Déplacé sans changement de contenu. |
| Import de `PostCard` dans `Feed.jsx` | Import depuis `components/Posts/` | Chemin mis à jour ; le composant continue d'afficher les publications du fil. |
| Import de `PostSkeleton` dans `Feed.jsx` | Import depuis `components/Posts/` | Chemin mis à jour ; le chargement conserve le même affichage. |
| Import de `PostCard` dans `DetailsPost.jsx` | Import depuis `components/Posts/` | Chemin mis à jour ; la page détail utilise toujours la même carte. |
| `src/favoris.jsx` | Supprimé | Ancien point de montage alternatif, distinct de la page `src/pages/Favoris/Favoris.jsx`. Le démarrage réel se fait par `src/main.jsx` et les routes sont déjà gérées par `App.jsx`. |

Les fonctions de données restent séparées dans `src/features/posts/normalizePost.js` et les requêtes restent dans `src/api/postsApi.js`. En résumé, les composants visuels partagés sont désormais regroupés dans `components/Posts`, tandis que la préparation des données de publication reste dans `features/posts`.

Ce refactoring n'a pas implémenté la page Favoris : le composant `Favoris.jsx` était déjà une page vide et le reste après le déplacement. Il n'a pas non plus ajouté de profils utilisateurs, d'authentification, de stockage permanent, ni de modification ou de suppression des publications.

## 10. Lancer et vérifier le projet

Depuis le dossier `react-project` :

```bash
npm install
npm run dev
```

Pour vérifier le code et produire une version compilée :

```bash
npm run lint
npm run build
```

`npm run preview` sert à prévisualiser localement le résultat compilé, après `npm run build`.

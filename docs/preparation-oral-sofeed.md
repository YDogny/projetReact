# Préparer l'oral de SoFeed React

Cette fiche est faite pour comprendre le projet et en parler avec ses propres mots. Le but n'est pas de réciter le code ni de faire semblant de tout savoir : il faut pouvoir expliquer le parcours principal, les choix simples et les limites.

Le guide plus détaillé des fichiers et du fonctionnement se trouve dans [le guide personnel SoFeed](./guide-personnel-sofeed.md).

## 1. L'idée générale, en termes simples

SoFeed est un petit réseau social de démonstration. Il récupère des publications sur Internet, les montre dans un fil, permet d'en ouvrir une et propose un formulaire pour en envoyer une nouvelle.

L'application est faite avec React. On peut imaginer qu'une page est construite comme un assemblage de petites pièces :

- une pièce affiche l'en-tête ;
- une pièce affiche une publication ;
- une pièce affiche le formulaire ;
- une page rassemble ces pièces et décide quand les montrer.

Les données des publications viennent de DummyJSON, un service de démonstration. Le navigateur demande les données au service, puis React les affiche.

## 2. Exemple de présentation orale (environ une minute)

> « Mon projet s'appelle SoFeed. C'est une petite application de réseau social réalisée avec React. Elle récupère des publications depuis DummyJSON et les affiche dans un fil. On peut ouvrir une publication pour voir ses détails et utiliser le formulaire pour en ajouter une au fil.
>
> J'ai organisé l'application en pages et en composants réutilisables. Par exemple, `Feed` gère le fil et `PostCard` affiche une publication. Les appels à l'API sont regroupés dans `postsApi.js`, ce qui évite de les mélanger à l'affichage. Les données passent par `normalizePost` pour donner aux composants un format cohérent.
>
> J'ai utilisé React Router pour passer du fil à la page détail sans recharger toute l'application, des CSS Modules pour isoler une partie des styles, et Vite pour lancer et compiler le projet. C'est un projet de démonstration : la création renvoyée par DummyJSON n'est pas sauvegardée durablement, et la page Favoris n'est pas encore implémentée. »

Adapte ce texte à ta façon de parler. Si une phrase ne correspond pas à ce que tu as compris, ne l'apprends pas par cœur : demande une explication ou reformule-la.

## 3. Le trajet d'une publication : l'explication la plus importante

Pour raconter le fonctionnement du fil, suis cette chaîne :

```text
Feed s'affiche
  → demande les publications à postsApi.js
  → DummyJSON renvoie une réponse
  → normalizePost prépare chaque publication
  → Feed conserve la liste dans son état React
  → PostCard affiche chaque publication
```

Pendant l'attente, l'application affiche `PostSkeleton`. Si la requête échoue, elle affiche un message d'erreur.

Pour raconter la création :

```text
L'utilisateur remplit FabForm
  → le formulaire vérifie et nettoie les champs
  → Feed reçoit les données et appelle createPost
  → postsApi.js envoie la requête à DummyJSON
  → la réponse est préparée et ajoutée au début du fil
```

DummyJSON simule la création, mais ne conserve pas durablement cette publication. C'est pour cela qu'elle peut disparaître après un rechargement.

## 4. Les notions à connaître

### React

React est l'outil qui permet de construire l'interface à partir de composants. Quand les données ou l'état changent, React met à jour l'affichage concerné.

**Exemple dans ce projet :** `PostCard` est un composant d'interface réutilisé pour afficher les publications.

### Composant

Un composant est une partie de l'interface, souvent écrite comme une fonction JavaScript qui renvoie du JSX (une syntaxe qui ressemble à du HTML).

**Pourquoi les séparer ?** Chaque composant a un rôle plus facile à repérer et peut être réutilisé. `Header`, `PostCard` et `FabForm` ne font pas tous la même chose.

### Props

Les props sont les informations qu'un composant reçoit de celui qui l'utilise. On peut les comparer aux paramètres d'une fonction.

**Exemple :** `PostCard` reçoit la publication dans la prop `post`. Le formulaire reçoit une fonction dans `onPostCreated` pour demander à la page d'ajouter une publication.

### État (`state`)

L'état est une information que React garde pendant que la page est affichée. Quand elle change, React recalcule l'interface.

**Exemples :**

- `posts` : la liste des publications du fil ;
- `loading` : indique si le chargement est encore en cours ;
- `error` : contient une erreur à montrer ;
- `title`, `body` et `tags` dans le formulaire : les valeurs saisies.

`useState` est le hook React utilisé ici pour créer et modifier un état.

### Effet (`useEffect`)

`useEffect` permet d'exécuter une action liée à l'affichage d'un composant. Dans `Feed`, il sert à demander les publications quand la page apparaît. Dans le détail, il relance la demande quand l'identifiant de l'URL change.

### API et `fetch`

Une API est une manière pour un programme de demander des données à un autre service. Ici, l'application utilise Internet pour communiquer avec DummyJSON. `fetch` est la fonction du navigateur utilisée pour envoyer une requête HTTP et recevoir une réponse.

Les fonctions dans `postsApi.js` centralisent ces requêtes. Cela rend les composants de page plus faciles à lire et évite de recopier les URL et les vérifications HTTP partout.

### Asynchrone (`async` / `await`)

Une requête Internet prend du temps. Le navigateur ne peut pas connaître son résultat immédiatement. `async` et `await` permettent d'écrire le code qui attend une réponse de façon lisible, sans bloquer toute l'interface.

Pendant l'attente, le projet peut afficher un état de chargement. Si la réponse échoue, le code attrape l'erreur et présente un message.

### React Router

React Router associe une adresse à une page. Dans `App.jsx`, `/` correspond au fil et `/detail/:id` correspond au détail d'une publication. Le `:id` est remplacé par son identifiant, par exemple `/detail/7`.

### CSS Modules

Un fichier CSS Module contient des styles associés à un composant ou à une page. Cela limite les risques qu'une classe de style ait le même nom qu'une classe utilisée ailleurs.

### Normalisation

Normaliser, ici, signifie transformer les données reçues en une forme que l'interface peut utiliser de manière prévisible. `normalizePost` ajoute des valeurs de repli si certains champs sont absents et fabrique l'URL de l'image.

## 5. Où aller si on te demande « où est le code ? »

Tous les chemins sont relatifs au dossier `react-project` :

- **Point d'entrée :** `src/main.jsx`.
- **Routes et cadre général :** `src/App.jsx`.
- **Fil et état des publications :** `src/pages/Feed/Feed.jsx`.
- **Page de détail :** `src/pages/DetailsPost/DetailsPost.jsx`.
- **Appels à DummyJSON :** `src/api/postsApi.js`.
- **Mise en forme des données :** `src/features/posts/normalizePost.js`.
- **Affichage réutilisable d'une publication :** `src/components/Posts/PostCard.jsx`.
- **Affichage pendant le chargement :** `src/components/Posts/PostSkeleton.jsx`.
- **Formulaire :** `src/components/FabForm/FabForm.jsx`.
- **Navigation du haut :** `src/components/Header/Header.jsx`.
- **Page Favoris actuelle :** `src/pages/Favoris/Favoris.jsx` (elle est vide pour le moment).

## 6. Pourquoi la structure a été déplacée ?

Avant le refactoring, `PostCard` et les deux fichiers du squelette de chargement se trouvaient dans `src/features/posts/`. Ils ont été déplacés dans `src/components/Posts/`, car ce sont des éléments visuels réutilisables.

Les imports dans `Feed.jsx` et `DetailsPost.jsx` ont été corrigés pour utiliser leur nouvel emplacement. Le chemin CSS de `PostCard` a également été adapté pour pointer vers `Posts.module.css` dans son nouveau dossier. Les fichiers `PostSkeleton.jsx` et `PostSkeleton.module.css` ont été déplacés sans changement de contenu.

La distinction à retenir est :

- `components/` : morceaux d'interface réutilisables ;
- `pages/` : écrans complets associés aux routes ;
- `features/posts/` : logique de données liée aux publications ;
- `api/` : communication avec le service externe.

Un ancien point de montage `src/favoris.jsx` a aussi été supprimé. Le démarrage réel est `src/main.jsx` et la page Favoris est déjà sélectionnée par une route dans `App.jsx`. La page `src/pages/Favoris/Favoris.jsx`, elle, existe toujours, mais ne contient pas encore de fonctionnalité.

Le refactoring a donc surtout clarifié où ranger les éléments. Il n'a pas, à lui seul, ajouté les favoris, les profils utilisateurs ou la sauvegarde durable des publications.

## 7. Questions probables à l'oral

### « Pourquoi avoir utilisé React ? »

> « React me permet de découper l'interface en composants et de mettre à jour l'affichage quand l'état change, par exemple quand la liste des publications arrive de l'API. »

### « Pourquoi séparer `postsApi.js` des pages ? »

> « Pour séparer les responsabilités : les pages gèrent l'interface et l'état, tandis que `postsApi.js` gère les requêtes HTTP. Si l'URL ou la façon d'appeler l'API change, les modifications sont regroupées au même endroit. »

### « À quoi sert `normalizePost` ? »

> « Les composants d'affichage ont besoin de données cohérentes. Cette fonction prépare chaque réponse et prévoit des valeurs de remplacement quand certains champs manquent. »

### « Pourquoi une carte réutilisable ? »

> « La même publication doit être affichée dans le fil et dans son détail. Une seule `PostCard` évite de dupliquer le même affichage. Des options permettent de montrer le lien dans le fil et les métriques dans le détail. »

### « Que se passe-t-il si l'API échoue ? »

> « La requête produit une erreur si la réponse HTTP n'est pas réussie. La page attrape cette erreur et affiche un message au lieu de laisser croire que le chargement a fonctionné. »

### « Est-ce que créer une publication la sauvegarde vraiment ? »

> « Non. DummyJSON renvoie une réponse de démonstration, mais ne conserve pas cette création comme le ferait une vraie base de données. On l'ajoute seulement à la liste affichée dans la session actuelle. »

### « Qu'est-ce qui n'est pas terminé ? »

> « La page Favoris est vide. Il n'y a pas de profil utilisateur, ni de modification ou de suppression des publications. La création n'est pas persistante, et le projet n'a pas de lien de déploiement pour le moment. »

### « Qu'as-tu changé lors du refactoring ? »

> « Les composants réutilisables de publication et de chargement ont été rangés dans `components/Posts`. J'ai mis à jour les imports dans le fil et la page détail. La logique de normalisation est restée dans `features/posts`, et les appels réseau dans `api`. Le but était de clarifier la structure sans changer le fonctionnement du fil. »

## 8. Si tu ne connais pas la réponse

À l'oral, il vaut mieux décrire ce que tu sais et reconnaître une limite que d'inventer. Tu peux dire :

- « Je ne l'ai pas encore implémenté ; actuellement, le code fait… »
- « Je ne connais pas la réponse exacte, mais je peux vous montrer où cette partie est gérée. »
- « Je vais vérifier dans le fichier concerné plutôt que de répondre au hasard. »

Tu peux ouvrir le fichier correspondant et retracer son appel : par exemple, pour expliquer le chargement, pars de `Feed.jsx`, suis l'import de `fetchPosts`, puis regarde `postsApi.js`.

## 9. Petit plan de révision

1. Relis le mini-discours et reformule-le sans le regarder.
2. Entraîne-toi à raconter le trajet de chargement et le trajet de création à voix haute.
3. Ouvre les fichiers `App.jsx`, `Feed.jsx`, `postsApi.js` et `PostCard.jsx` et retrouve le rôle de chacun.
4. Apprends les limites réelles : Favoris vide, création non persistante, pas de profils ni de modification/suppression.
5. Entraîne-toi à répondre avec tes mots aux questions de la section précédente.

Tu n'as pas besoin de connaître chaque ligne par cœur. Le plus important est de comprendre le trajet général des données, le rôle des principaux fichiers et les fonctionnalités qui restent à faire.

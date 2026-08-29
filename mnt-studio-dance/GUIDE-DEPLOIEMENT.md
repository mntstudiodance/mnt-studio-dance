# Guide de déploiement — MNT Studio Dance

Ce dossier contient l'application complète, prête à être mise en ligne.
Comptez environ **15-20 minutes**, aucune compétence technique requise (juste
suivre les étapes dans l'ordre). Tout est gratuit.

Il y a 2 étapes : **A) créer la base de données partagée (Firebase)**,
puis **B) mettre le site en ligne (GitHub + Netlify)**.

---

## A) Créer la base de données partagée (Firebase — gratuit)

Sans cette étape, l'application ne pourra pas sauvegarder les cours, élèves
et présences de façon partagée entre l'admin et les professeurs.

1. Allez sur **https://console.firebase.google.com** et connectez-vous avec
   un compte Google (créez-en un si besoin, ou utilisez celui du studio).
2. Cliquez **« Ajouter un projet »**. Donnez-lui un nom, ex. `mnt-studio-dance`.
   Vous pouvez désactiver Google Analytics (pas nécessaire) puis « Créer le projet ».
3. Une fois dans le projet, dans le menu de gauche : **Build > Firestore Database**.
4. Cliquez **« Créer une base de données »**.
   - Choisissez une région proche (ex. `eur3 (europe-west)`).
   - Sélectionnez **« Mode production »**.
5. Une fois créée, allez dans l'onglet **« Règles »** de Firestore, effacez
   le contenu et collez ceci, puis **Publier** :

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /mnt-studio/{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   ⚠️ Ces règles autorisent la lecture/écriture de cette collection précise à
   quiconque connaît l'adresse de votre site. C'est suffisant pour démarrer
   (comme la plupart des petites apps internes), mais ce n'est pas une
   sécurité de niveau bancaire. Si besoin, on pourra durcir ça plus tard.

6. Revenez à la page d'accueil du projet (icône maison), cliquez sur
   l'icône **`</>`** (« Ajouter une application Web »).
7. Donnez un surnom (ex. `mnt-app`), pas besoin de cocher Hosting, cliquez
   **« Enregistrer l'application »**.
8. Firebase affiche un bloc de code avec un objet `firebaseConfig = { ... }`.
   **Copiez les 6 valeurs** (apiKey, authDomain, projectId, storageBucket,
   messagingSenderId, appId).
9. Sur votre ordinateur, **décompressez le zip** que je vous ai fourni
   (`mnt-studio-dance-projet.zip`) — clic droit dessus > « Extraire tout »
   (Windows) ou double-clic (Mac). Vous obtenez un dossier `mnt-studio-dance`.
   Ouvrez ce dossier, puis le sous-dossier **`src`** : vous y trouverez le
   fichier **`firebase.js`**.
10. Ouvrez ce fichier `firebase.js` avec un simple éditeur de texte
    (Bloc-notes sur Windows, TextEdit en mode texte brut sur Mac, ou
    Notepad++/VS Code si vous en avez) — **pas** Word, qui abîmerait le
    fichier. Remplacez chacune des 6 valeurs `"REMPLACER_..."` par les
    vraies valeurs copiées à l'étape 8, en gardant les guillemets.
    Enregistrez le fichier (gardez le format `.js`, ne changez pas
    l'extension).
11. Remettez ce dossier `mnt-studio-dance` (avec le fichier `firebase.js`
    modifié) de côté : c'est celui que vous utiliserez à l'étape B.1
    ci-dessous pour l'upload sur GitHub.

---

## B) Mettre le site en ligne (GitHub + Netlify — gratuit)

### 1. Créer un dépôt GitHub

1. Allez sur **https://github.com** et créez un compte si besoin.
2. Cliquez **« New »** (nouveau dépôt). Nom : `mnt-studio-dance`. Laissez-le
   **Public** ou **Private** (peu importe), ne cochez aucune case
   d'initialisation, puis **« Create repository »**.
3. Sur la page qui s'affiche, cliquez **« uploading an existing file »**.
4. Glissez-déposez **tout le contenu de ce dossier** (tous les fichiers et
   dossiers, y compris `src/`, mais **pas** besoin de `node_modules` s'il
   existe — il n'y en a pas ici) dans la zone d'upload.
5. Cliquez **« Commit changes »** en bas de page.

### 2. Déployer sur Netlify

1. Allez sur **https://app.netlify.com** et créez un compte (vous pouvez
   vous connecter directement avec votre compte GitHub, c'est le plus simple).
2. Cliquez **« Add new site » > « Import an existing project »**.
3. Choisissez **GitHub**, autorisez l'accès, puis sélectionnez le dépôt
   `mnt-studio-dance` que vous venez de créer.
4. Netlify détecte automatiquement qu'il s'agit d'un projet Vite. Vérifiez que :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Cliquez **« Deploy »**. Au bout de 1-2 minutes, votre site est en ligne
   avec une adresse du type `https://un-nom-genere.netlify.app`.
6. (Optionnel) Dans **Site settings > Domain management**, vous pouvez
   changer ce nom ou brancher un nom de domaine personnalisé
   (ex. `appel.mntstudiodance.fr`) si vous en avez un.

---

## C) Tester

1. Ouvrez l'adresse Netlify sur votre téléphone ou ordinateur.
2. Connectez-vous en admin, créez/vérifiez vos cours et professeurs.
3. Connectez-vous avec un compte professeur et testez **« Signaler une
   absence »** : l'email devrait maintenant partir automatiquement vers
   `contact@mntstudiodance.fr` (plus de blocage réseau, contrairement à
   l'aperçu Claude).
4. **La toute première fois**, `contact@mntstudiodance.fr` recevra un email
   d'activation de FormSubmit.co à confirmer d'un clic — ensuite tout est
   automatique, sans aucune autre action.

---

## Dépannage

**Erreur au build Netlify : `ENOENT ... open '/opt/build/repo/package.json'`**

Cela signifie que `package.json` n'est pas à la racine du dépôt GitHub, mais
dans un sous-dossier (souvent parce que le dossier `mnt-studio-dance` entier
a été glissé sur GitHub, au lieu de son contenu). Deux façons de corriger :

- **Sans retoucher GitHub** : dans Netlify, allez dans *Site settings >
  Build & deploy > Build settings > Edit settings*, renseignez **« Base
  directory »** avec le nom du sous-dossier (ex. `mnt-studio-dance`), puis
  relancez un déploiement (*Deploys > Trigger deploy > Deploy site*).
- **En corrigeant GitHub** : ouvrez le sous-dossier sur la page du dépôt,
  et re-uploadez chaque fichier/dossier qu'il contient directement à la
  racine du dépôt (pas dans un sous-dossier).

## Pour la suite (mises à jour)

Si vous souhaitez que je fasse évoluer l'application plus tard, je vous
donnerai les fichiers modifiés à re-uploader sur GitHub (même méthode qu'à
l'étape B.1.4) — Netlify republie automatiquement le site à chaque mise à jour.

// ⚠️ Remplacez les valeurs ci-dessous par celles de VOTRE projet Firebase.
// Vous les trouverez dans : Firebase Console > Paramètres du projet > Vos applications > Config SDK.
// Voir le fichier GUIDE-DEPLOIEMENT.md pour la marche à suivre pas à pas.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "REMPLACER_apiKey",
  authDomain: "REMPLACER_authDomain",
  projectId: "REMPLACER_projectId",
  storageBucket: "REMPLACER_storageBucket",
  messagingSenderId: "REMPLACER_messagingSenderId",
  appId: "REMPLACER_appId",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

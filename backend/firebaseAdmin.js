import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const admin = initializeApp({
  credential: cert(
    "./ctx-stability-db-firebase-adminsdk-nqgh2-3b297c94ef.json"
  ),
});

export const db = getFirestore();

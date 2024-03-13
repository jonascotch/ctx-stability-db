import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const admin = initializeApp({
  credential: cert('./adminsdk.json'),
});

export const db = getFirestore();

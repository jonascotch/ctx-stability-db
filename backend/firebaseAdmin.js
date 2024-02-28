import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const admin = initializeApp({
  credential: cert("./cert.json"),
});

export const db = getFirestore();

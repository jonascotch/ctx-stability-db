import {initializeApp, cert} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore'

export const admin = initializeApp({
    credential: cert('./ctx-stability-db-firebase-adminsdk-nqgh2-cbe55dc45b.json')
})

export const db = getFirestore()

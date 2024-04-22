import { 
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY 
} from "$env/static/private";
import { getApps } from "firebase-admin/app";
import pkg from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const alreadyCreatedAps = getApps();

if(alreadyCreatedAps.length === 0) {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: JSON.parse(FIREBASE_PRIVATE_KEY).key
    })
  })
}

export const adminAuth = getAuth();
import { db } from "$lib/scripts/firebase";
import { redirect } from "@sveltejs/kit";
import { DocumentSnapshot, doc, getDoc, type DocumentData } from "firebase/firestore";

export const load = async ({locals}) => {
  if(!locals.userId) {
    throw redirect(303, 'login');
  }

  const getUser = async (uid: string) => {
    let docSnap:DocumentSnapshot<DocumentData, DocumentData> | null = null

    try {
      const docRef = doc(db, 'users', uid);
      docSnap = await getDoc(docRef);
    }
    catch(e) {
      console.error('An error occured at getUser() in app route')
      console.error(e);
    }

    return docSnap?.data();
  }

  return {
    user: await getUser(locals.userId!),
    userId: locals.userId
  }
} 
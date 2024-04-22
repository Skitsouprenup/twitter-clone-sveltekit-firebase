import { db } from '$lib/scripts/firebase.js'
import { error } from '@sveltejs/kit'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'


export const load = async ({ params }) => {
  const {postId} = params

  const getPost = async () => {
    try {
      const snap = await getDoc(doc(db, 'posts', postId));
      return snap.data();
    }
    catch(e) {
      console.error(e);
      throw error(400, "Invalid Request");
    }
  }

  const getComments = async () => {
    try {
      const comments: Array<Record<string, string>> = [];
      const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));

      const snap = await getDocs(commentsQuery);

      snap.forEach((item) => {
        comments.push({id: item.id, ...item.data()})
      })

      return comments;
    }
    catch(e) {
      console.error(e);
      throw error(400, "Invalid Request");
    }
  }

  return {
    post: await getPost(),
    comments: await getComments()
  }
}
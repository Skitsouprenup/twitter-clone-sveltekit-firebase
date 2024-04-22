import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "$lib/scripts/firebase"
import { redirect } from "@sveltejs/kit";

export const load = async ({depends, locals}) => {
  if(!locals.userId) {
    throw redirect(303, 'login');
  }
  //This load function will rerun if invalidate('posts')
  //is called.
  depends('posts');

  const getPosts = async () => {

    const posts: Array<Record<string, string>> = []

    try {
      const q = query(collection(db, "posts"), where("userId", "==", locals.userId));

      const snapshot = await getDocs(q)
      snapshot.forEach((doc) => {
        const post = { id: doc.id, ...doc.data() }
        posts.push(post)
      })
    }
    catch(error) {
      console.error('An error occured at getPosts() in app route')
      console.error(error)
      //throw error(400, 'An error occured.')
    }

    return posts;
  }

  return {
    posts: await getPosts()
  }
}
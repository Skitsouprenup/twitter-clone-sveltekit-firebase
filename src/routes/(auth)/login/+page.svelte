<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import { signInWithPopup } from "firebase/auth";
  import { auth, db, provider } from "$lib/scripts/firebase";
	import { doc, getDoc, setDoc } from "firebase/firestore";
	import { goto } from "$app/navigation";

  const login = async () => {
    try {
      /*
        NOTE
        For some reason, request.auth in the rules of 
        firebase firestore database is always null even
        the login is successful. As the time of this writing,
        I'm not sure what causing it.
      */
      const { user } = await signInWithPopup(auth, provider);
      const idToken = await user.getIdToken();

      await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(idToken)
      })

      //Get document reference
      //params:
      //db = firestore(database) instance
      //'users' = collection name.
      //user.uid = uid of a specific user
      const userDocRef = doc(db, 'users', user.uid)

      //Get document content(snapshot)
      const userDoc = await getDoc(userDocRef)
      //Create user if doesn't exist
      if(!userDoc.exists()) {
        //setDoc can be used to create document
        await setDoc(
          //Get updated doc reference
          doc(db, 'users', user.uid),
          {
            name:user.displayName,
            email:user.email,
            profilePic:user.photoURL
          }
          //Use the merge option if you wanna
          //update the document.
          /*
          {
            //We don't want to overwrite the existing document
            //We just want to update some of its properties.
            merge: true
          }
          */
        )
      }

      //move to home page
      goto('/')
    }
    catch(error) {
      console.error(error);
    }
  }
</script>

<div class="flex justify-center items-center w-full h-full">
  <div class="flex flex-col gap-4 items-center">
    <img alt="login" src="/twitter-logo.png" />
    <Button on:click={login} class="w-fit">Login with Google</Button>
  </div>
</div>
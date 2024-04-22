<script lang="ts">
  import { Image } from "lucide-svelte";
  import * as Avatar from "../ui/avatar/index";
	import Button from "../ui/button/button.svelte";
	import Textarea from "../ui/textarea/textarea.svelte";
	import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
	import { db, storage } from "$lib/scripts/firebase";
	import { addDoc, collection, type DocumentData } from "firebase/firestore";
	import { invalidate } from "$app/navigation";

  let tweet = ''
  let loading = false
  let imgFile:File

  export let user: DocumentData | undefined
  export let userId:string

  function onFileSelected(event: Event) {
    const target = event.target as unknown as { files: File[] };
    const file: File = target?.files[0];
    imgFile = file
  }

</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 sticky top-0 relative backdrop-blur-sm">
    <Button 
      variant="link" 
      class="text-white text-md font-semibold flex-1 
      hover:bg-white/10 rounded-none"
    >
      For You
    </Button>
    <Button 
      variant="link" 
      class="text-gray-500 text-md font-semibold flex-1
      hover:bg-white/10 rounded-none"
    >
      Following
    </Button>
  </div>
  <hr class="p-0 m-o"/>

  <div class="p-2 flex gap-2">
    <Avatar.Root class='p-1'>
      <Avatar.Image src={user?.profilePic} alt="icon" class="rounded-full" />
      <Avatar.Fallback>Icon</Avatar.Fallback>
    </Avatar.Root>
  
    <div class="flex flex-col w-full">
      <Textarea 
        class="resize-none w-full text-lg rounded-none" 
        placeholder="What's Happening..."
        bind:value={tweet}
      />
      <div class="flex gap-2 p-1 pt-2">
        <div>
          <input 
            type="file" 
            hidden 
            id='img' 
            accept="image/*"
            on:change={onFileSelected} 
          />
          <label for="img">
            <Image class="cursor-pointer text-primary" />
          </label>
        </div>
        
        <div class="flex-1 flex flex-row-reverse">
          <Button 
            class="rounded-[15px] w-[75px] p-0"
            on:click={
              async() => {
                loading = true
                let url = ''
                if(imgFile) {
                  //Create or look for the directory of posts/${userId}/
                  const storeRef = ref(storage, `posts/${userId}/${imgFile?.name}`)
                  const uploaded = await uploadBytes(storeRef, imgFile)
                  url = await getDownloadURL(uploaded.ref)
                }
                //collection is an entity that stores documents
                await addDoc(collection(db,'posts'),{
                  tweet,
                  userId,
                  imgUrl: url,
                  ...user,
                  likes:[]
                })

                loading = false
                tweet = ''
                invalidate('posts')
              }
            }
            disabled={tweet?.length < 5 || loading}
          >
            {#if loading}
              loading...
              {:else}
              Post
            {/if}
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
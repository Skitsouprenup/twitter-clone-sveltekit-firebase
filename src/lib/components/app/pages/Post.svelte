<script lang="ts">
  import { Heart, MessageCircle, MoveDownLeft, Repeat2 } from "lucide-svelte";
  import * as Avatar from "$lib/components/ui/avatar/index";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Textarea } from "$lib/components/ui/textarea";
  import { addDoc, collection, query, type DocumentData, where, onSnapshot, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
	import { db } from "$lib/scripts/firebase";
	import { page } from "$app/stores";
	import TweetCard from "../TweetCard.svelte";
	import { onMount } from "svelte";

  let comment = ''
  let likeActive = false

  export let post:DocumentData | undefined;
  export let user:DocumentData | undefined;
  export let comments: Array<Record<string, string>>

  onMount(() => {
    const commentsQuery = query(
      collection(db, 'comments'), 
      where('postId', '==', $page.params.postId)
    );

    //Watch for changes in comments collection and execute
    //this function if there's a change. Otherwise, this won't
    //be executed.
    const unsubscribe = onSnapshot(commentsQuery, (snapShots) => {
      const updated:Array<Record<string, string>> = []
      snapShots.forEach((item) => {
        updated.push(item.data())
      })

      comments = updated;
    })

    if(post?.likes.includes($page.data.userId))
      likeActive = true

    //Execute once the component is removed from the DOM.
    return () => {
      unsubscribe();
    }
  });

  export const handlePostLikes = async () => {
    const postRef = doc(db, 'posts', $page.params.postId);

    if(post?.likes.includes($page.data.userId)) {
      likeActive = false
      if(post?.likes) {
        post.likes = post.likes.filter((id:string) => id !== $page.data.userId)
      }

      const updated = await updateDoc(postRef, {
        likes: arrayRemove($page.data.userId)
      })
    }
    else {
      likeActive = true
      if(post?.likes) {
        post.likes = [...post.likes, $page.data.userId]
      }

      await updateDoc(postRef, {
        likes: arrayUnion($page.data.userId)
      })
    }
  }

  const addComment = async () => {
    const newComment = comment
    comment = ''

    await addDoc(
      collection(db, 'comments'),
      {
        comment: newComment,
        userId: $page.data.userId,
        userName: user?.name,
        profilePic: user?.profilePic,
        postId: $page.params.postId
      }
    )
    console.log('test')
  }
</script>

<div class="flex flex-col gap-3">
  <div class="flex gap-2 items-center p-2">
    <MoveDownLeft class="w-5 h-5"/>
    <h3 class="text-lg font-semibold">Post</h3>
  </div>

  <div class="flex gap-1 p-2">
  
    <div class="flex flex-col gap-2 w-full">
      <div class="flex justify-between">
        <div class="flex gap-1">
          <Avatar.Root class='p-1'>
            <Avatar.Image class="rounded-full" src={user?.profilePic} alt="icon" />
            <Avatar.Fallback>Icon</Avatar.Fallback>
          </Avatar.Root>
  
          <div class="flex flex-col">
            <h3 class="text-sm font-semibold">{user?.name}</h3>
            <h3 class="text-sm text-stone-400">{user?.email}</h3>
          </div>
        </div>

        <div>
          <Button variant="secondary">Follow</Button>
        </div>
      </div>
      
      <p>
        {post?.tweet}
      </p>
  
      {#if post?.imgUrl}
        <div class="flex justify-center pt-2">
          <img alt="post" src={post?.imgUrl} class="object-contain"/>
        </div>
      {/if}
  
      <div 
        class="flex justify-between mt-5 pr-[1.9rem] pl-[1rem]"
      >
        <div class="flex gap-1 items-center">
          <Button 
            class="bg-transparent transition-colors p-2 hover:bg-blue-500/20 rounded-full"
            on:click={handlePostLikes}
          >
            {#if likeActive}
            <Heart fill="red" color="red"/>
            {:else}
            <Heart />
            {/if}
          </Button>
          <span class="">{post?.likes.length}</span>
        </div>
  
        <div class="flex gap-1 items-center">
          <span class="p-2 hover:bg-blue-500/20 rounded-full">
            <MessageCircle />
          </span>
          <span class="">{comments.length}</span>
        </div>
  
        <div class="flex gap-1 items-center">
          <span class="p-2 hover:bg-blue-500/20 rounded-full">
            <Repeat2 />
          </span>
          <span class="">0</span>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-1 p-2">
    <Avatar.Root class='p-1'>
      <Avatar.Image class="rounded-full" src={user?.profilePic} alt="icon" />
      <Avatar.Fallback>Icon</Avatar.Fallback>
    </Avatar.Root>

    <div class="flex flex-col w-full">
      <Textarea 
        class="resize-none w-full text-lg rounded-none" 
        placeholder="Post your reply..."
        bind:value={comment}
      />
      <div class="flex gap-2 p-1 pt-3">
        
        <div class="flex-1 flex flex-row-reverse">
          <Button 
            class="rounded-[15px]"
            disabled={comment.length < 1}
            on:click={addComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-8 px-2">
    {#each comments as comment}
      <TweetCard content={comment} {user} contentType='comment'/>
    {/each}
  </div>
</div>
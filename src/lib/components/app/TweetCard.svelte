<script lang="ts">
  import { Heart, MessageCircle, Repeat2 } from "lucide-svelte";
  import * as Avatar from "$lib/components/ui/avatar/index";
	import type { DocumentData } from "firebase/firestore";

  export let content: Record<string, string>
  export let user: DocumentData | undefined
  export let contentType: string = 'post'
</script>

<div class="flex gap-1">
  <div>
    <Avatar.Root class='p-1'>
      <Avatar.Image src={user?.profilePic} alt="icon" class="rounded-full" />
      <Avatar.Fallback>Icon</Avatar.Fallback>
    </Avatar.Root>
  </div>

  <div class="flex flex-col gap-2 w-full">
    <div class="flex gap-1">
      <h3 class="text-sm font-semibold">{user?.name}</h3>
      <h3 class="text-sm text-stone-400">{user?.email}</h3>
    </div>
    
    <div class="flex flex-col gap-2">
      <a href={`post/${content?.id}`}>
        <p>
          {contentType === 'post' ? content?.tweet : content?.comment}
        </p>
    
        {#if content?.imgUrl}
          <div class="flex justify-center pt-2">
            <img alt="post" src={content.imgUrl} class="object-contain"/>
          </div>
        {/if}
      </a>
    </div>

    <div 
      class="flex justify-between mt-5 pr-[1.9rem] pl-[1rem]"
    >
      <div class="flex gap-1 items-center">
        <span class="p-2 hover:bg-blue-500/20 rounded-full">
          <Heart />
        </span>
        <span class="">5</span>
      </div>

      <div class="flex gap-1 items-center">
        <span class="p-2 hover:bg-blue-500/20 rounded-full">
          <MessageCircle />
        </span>
        <span class="">0</span>
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
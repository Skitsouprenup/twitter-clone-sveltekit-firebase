<script>
	import InputContent from "$lib/components/app/InputContent.svelte";
	import TweetCard from "$lib/components/app/TweetCard.svelte";

  //Get the return value of load()
  //in +page.server.ts and +layout.server.ts
  export let data
</script>
<div class="flex flex-col gap-4">
  <InputContent user={data.user} userId={data.userId}/>
  <div class="flex flex-col gap-2 p-2">
    {#if data.posts.length > 0}
      {#each data.posts as post}
        <TweetCard content={post} user={data.user}/>
      {/each}
      {:else}
      <div class="flex flex-col items-center justify-center text-2xl font-semibold">
        You don't have any tweets yet.
        <span class="text-gray-500 text-sm">
          Go and create one!
        </span>
      </div>
    {/if}
    
  </div>
</div>

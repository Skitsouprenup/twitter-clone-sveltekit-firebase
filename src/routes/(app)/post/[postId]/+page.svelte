<script>
	import Post from "$lib/components/app/pages/Post.svelte";

  export let data;
</script>

<div>
  <Post post={data.post} user={data.user} comments={data.comments}/>
</div>
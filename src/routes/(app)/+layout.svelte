<script lang="ts" >
	import RightContent from "$lib/components/app/RightContent.svelte";
  import Sidebar from "$lib/components/app/Sidebar.svelte";
  import "/src/app.css";
</script>

<main class="flex gap-1 h-screen">
  <Sidebar />
  <div class="md:w-[200px] w-[50px]"></div>
  <div class="flex-1 pt-4 pb-4">
    <slot/>
  </div>
  <RightContent />
</main>
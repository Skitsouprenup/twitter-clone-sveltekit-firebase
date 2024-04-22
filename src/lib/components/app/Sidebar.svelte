<script lang='ts'>
	import Button from "../ui/button/button.svelte";
	import * as Avatar from "../ui/avatar/index";
	import { sidebarSelection } from "../../scripts/constants";
  import { Pencil } from "lucide-svelte";
	import { page } from "$app/stores";
	import { breakWord } from "$lib/utils";
	import { signOut } from "firebase/auth";
  import { auth } from "$lib/scripts/firebase"
	import { goto } from "$app/navigation";

  const logout = async () => {
    await signOut(auth);
    await fetch('/login', {
      method: 'DELETE'
    });
    goto('/login');
  }
</script>

<div 
  class="flex flex-col flex-0 h-screen md:w-[200px] w-[50px] justify-between border-r 
         fixed p-2"
  >
  <div class="flex flex-col gap-3 w-full pr-1">
    {#each sidebarSelection as {id, icon, href, label}(id)}
      {#if label === 'Logout'}
        <Button
          on:click={logout}
          class="flex items-center md:justify-start justify-center 
          bg-transparent hover:bg-gray-200/10 p-2 rounded-xl gap-1"
        >
          <svelte:component this={icon} class="w-4 h-4 md:w-7 md:h-7"/>
          <p class="text-lg md:block hidden">
            {label}
          </p>
        </Button>
      {:else}
        <a {href} 
          class="flex items-center md:justify-start justify-center 
                hover:bg-gray-200/10 p-2 rounded-xl gap-1"
          >
          <svelte:component this={icon} class="w-4 h-4 md:w-7 md:h-7"/>
          <p class="text-lg md:block hidden">
            {label}
          </p>
        </a>
      {/if}
    {/each}
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <Button class='relative left-[3px] p-0 md:w-[175px] md:h-[45px] w-[25px] h-[25px] flex gap-1'>
      <Pencil class='w-4 h-4'/>
      <span class="text-lg md:inline hidden">
        Post
      </span>
    </Button>
  
    <div class="flex gap-1 items-center justify-center">
      <Avatar.Root class='p-1 flex'>
        <Avatar.Image 
          src={$page.data.user.profilePic} 
          alt="icon" 
          class="rounded-full md:w-[35px] md:h-[35px] w-[25px] h-[25px]" 
        />
        <Avatar.Fallback>Icon</Avatar.Fallback>
      </Avatar.Root>
      <div class="text-lg md:inline hidden">
        <p>{$page.data.user.name}</p>
        <p class="text-stone-500 text-sm">
          {breakWord($page.data.user.email)}
        </p>
      </div>
    </div>
  </div>
</div>
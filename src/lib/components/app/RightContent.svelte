<script lang="ts">
  import { Input } from "$lib/components/ui/input/index";
  import { Search } from "lucide-svelte";
	import Card from "./card/Card.svelte";
	import Button from "../ui/button/button.svelte";
</script>
 
<div class="flex-0 lg:flex hidden flex-col gap-5 max-w-[300px] pt-4 pr-4 pb-4">
  <div class="rounded-md flex items-center bg-gray-500">
    <Search class="text-gray-200 ml-3"/>
    <Input
      type="text" 
      placeholder="Search..." 
      class="bg-gray-500 text-lg text-black rounded-md border-0 
      outline-offset-0 placeholder:text-gray-300 focus-visible:ring-0 
      focus-visible:ring-offset-0" 
    />
  </div>
  
  <div class="flex flex-col gap-3">
    <Card let:CardTitle>
      <CardTitle>
        Subscribe to Premium
      </CardTitle>
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Proin auctor felis vitae ullamcorper vehicula. Proin eget finibus turpis.
      </p>
      <div class="w-full" slot="action">
        <Button class="w-full">
          Subscribe
        </Button>
      </div>
    </Card>

    <Card let:CardTitle>
      <CardTitle>
        Trending For You
      </CardTitle>
      <div slot="content" class="flex flex-col gap-2">
        <div class="flex gap-2">
          <p class="text-sm text-stone-500">
            Music
          </p>
          <p class="text-sm text-stone-500">
            Trending
          </p>
        </div>

        <div class="flex flex-col gap-1 card-content p-1">
          <h2 class="text-md font-semibold">
            Jane Doe
          </h2>
          <p class="text-sm text-stone-500">
            100.5K
          </p>
        </div>
      </div>
    </Card>
    </div>
</div>

<style>
.card-content:hover {
  background-color: rgba(255,255,255,0.05)}
</style>

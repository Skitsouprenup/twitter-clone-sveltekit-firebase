<script>
  import CardTitle from "./CardTitle.svelte";
</script>

<div class="bg-gray-800 rounded-sm p-3 flex flex-col gap-2">
  <slot CardTitle={CardTitle} />
  <slot name="content" />
  {#if $$slots.action}
    <slot name="action" />
  {/if}
</div>
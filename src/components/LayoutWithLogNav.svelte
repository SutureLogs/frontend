<script>
  import LogNavbar from "./LogNavbar.svelte";
  export let params = {};
  let loading = false;
</script>

<section
  class="flex flex-col md:flex-row h-full min-h-screen bg-slate-50 text-black"
>
  <LogNavbar {params} />
  {#if loading}
    <div class="animate-pulse">Loading...</div>
  {:else}
    <div class="flex-1 md:ml-64">
      <slot />
    </div>
  {/if}
</section>

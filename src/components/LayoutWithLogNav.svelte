<script>
  import LogNavbar from "./LogNavbar.svelte";
  export let params = {};
  import { onMount } from "svelte";
  import { store } from "../stores/store";
  import { replace } from "svelte-spa-router";
  import toast from "svelte-french-toast";

  onMount(() => {
    if (!$store.jwt) {
      toast.error("You must be logged in to access this page");
      replace("/auth");
    }
  });
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

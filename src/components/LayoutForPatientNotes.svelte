<script>
  import { onMount } from "svelte";
  import { store } from "../stores/store";
  import { push } from "svelte-spa-router";
  import toast from "svelte-french-toast";

  onMount(() => {
    if (!$store.jwt) {
      toast.error("You must be logged in to access this page");
      push("/auth");
    }
  });
  export let loading = false;
</script>

<section
  class="flex flex-col md:flex-row h-full min-h-screen bg-slate-50 text-black"
>
  {#if loading}
    <div class="animate-pulse">Loading...</div>
  {:else}
    <div class="flex-1">
      <slot />
    </div>
  {/if}
</section>

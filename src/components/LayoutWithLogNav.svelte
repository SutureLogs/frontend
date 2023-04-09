<script>
  import LogNavbar from "./LogNavbar.svelte";
  export let params = {};
</script>

<section
  class="flex flex-col md:flex-row h-full min-h-screen bg-slate-50 text-black"
>
  <LogNavbar {params} />
  <div class="flex-1">
    <slot />
  </div>
</section>

<script>
  export let isActive = false;
  export let label = "Placeholder";
  export let svg;
  export let link = "";
</script>

{#if isActive}
  <a
    href={"/#" + link}
    class="flex gap-3 items-center justify-center border-l-[10px] border-[#6990d8] w-full p-4 bg-gradient-to-r from-[#82aaf4] via-transparent to-slate-50 bg-opacity-0"
  >
    <div>
      {#if svg}
        <img class="h-5 w-5" src={svg} alt="" />
      {/if}
    </div>
    <label
      for=""
      class="label-text-alt uppercase py-2 font-bold tracking-widest"
    >
      {label}</label
    >
  </a>
{:else}
  <a
    href={"/#" + link}
    class="flex gap-3 items-center justify-center w-full p-4 opacity-40 hover:opacity-90 transition duration-200 cursor-pointer"
  >
    <div>
      {#if svg}
        <img class="h-5 w-5" src={svg} alt="" />
      {/if}
    </div>
    <label
      for=""
      class="label-text-alt uppercase py-2 font-bold tracking-widest"
    >
      {label}</label
    >
  </a>
{/if}

<script>
  import { push, replace } from "svelte-spa-router";
  import Label from "../titles/Label.svelte";
  export let surgeryName = "";
  export let patientId = "";
  export let surgeryId = "";
  export let index = 0;
  export let isActive = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
  on:click={() => {
    // push(`/patient/${patientId}/${surgeryId}`);
    window.location.href = `/#/patient/${patientId}/${surgeryId}`;
    window.location.reload();
  }}
  class="border-2 cursor-pointer w-full p-5 border-r-0 hover:opacity-100 pl-8 border-b-0 border-t-0 transition flex flex-col {isActive
    ? 'border-l-[10px] border-[#6990d8] bg-gradient-to-r from-[#82aaf4] via-transparent to-slate-50 bg-opacity-0'
    : 'hover:border-l-[10px] hover:border-gray-300 opacity-70'}"
>
  <Label styleClass="opacity-70">Surgery {index}</Label>
  <h1 class="text-lg font-semibold">{surgeryName}</h1>
</button>

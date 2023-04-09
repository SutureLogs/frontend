<script>
  import { push } from "svelte-spa-router";
  import Label from "../titles/Label.svelte";
  export let surgeryName =
    "Hand‑assisted laparoscopic surgery for an esophageal hiatal hernia with incarcerated transverse colon presenting after laparoscopic gastrectomy";
  export let surgeonName = "Doctor Name";
  export let surgeonTitle = "Doctor Title";
  export let orgName = "Org Name";
  export let date = "22/3/12";
  export let logID = "";
</script>

<div class="flex flex-col py-4 border-b-2">
  <div class="text-lg font-semibold">
    {surgeryName}
  </div>

  <div class="flex flex-col mt-3">
    <div class="font-bold text-base opacity-50">{surgeonName}</div>
    <div class="text-sm pb-2">
      {surgeonTitle}, {orgName}
    </div>
  </div>

  <div class="flex justify-between items-center">
    <Label><span class="opacity-50">Conducted on </span> {date}</Label>
    {#if logID}
      <button on:click={() => push("/base/" + logID)}>></button>
    {:else}
      <div class="text-sm px-2 opacity-50 rounded-full border">No record</div>
    {/if}
  </div>
</div>

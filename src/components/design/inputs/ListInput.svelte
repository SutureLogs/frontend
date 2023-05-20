<script>
  import Label from "../titles/Label.svelte";

  export let styleClass = "";
  export let options = [];
  export let label;
  export let value = "";
  export let isDisabled = false;
</script>

<div class="flex flex-col gap-2 {styleClass}">
  <Label styleClass="text-primary ">{label}</Label>
  <select
    disabled={isDisabled}
    bind:value
    class="select select-bordered w-full bg-transparent"
  >
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</div>

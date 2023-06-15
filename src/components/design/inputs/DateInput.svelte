<script>
  import Label from "../titles/Label.svelte";

  export let styleClass = "";
  export let date = "";
  export let label = "";
</script>

<div class="flex flex-col gap-2 {styleClass}">
  <Label styleClass="text-primary">{label}</Label>
  <input
    type="date"
    class="input input-bordered bg-transparent"
    bind:value={date}
  />
</div>

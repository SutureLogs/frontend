<script>
  import Label from "../titles/Label.svelte";
  export let age = 23;
  export let gender = "Male";
  export let styleClass = "";
</script>

<div class={`${styleClass}`}>
  <Label styleClass="text-primary border-b-2 pb-3">PATIENT DETAILS</Label>
  <div class="flex flex-col">
    <div class="p-5 flex justify-between border-b-2">
      <Label styleClass="opacity-50">Age</Label>
      <Label>{age}</Label>
    </div>
    <div class="p-5 flex justify-between border-b-2">
      <Label styleClass="opacity-50">Gender</Label>
      <Label>{gender}</Label>
    </div>
  </div>
</div>

<script>
  import Label from "../titles/Label.svelte";
  export let age = 0;
  export let gender = "Male";
  export let styleClass = "";
  export let labelStyle = "";
</script>

<div class={`${styleClass}`}>
  <Label styleClass="text-primary  pb-3 {labelStyle}">PATIENT DETAILS</Label>
  <div class="flex flex-col border-t-2">
    <div class="p-5 flex justify-between border-b-2">
      <Label styleClass="opacity-50">Age</Label>
      <Label>{age ?? "-"}</Label>
    </div>
    <div class="p-5 flex justify-between border-b-2">
      <Label styleClass="opacity-50">Gender</Label>
      <Label>{gender ?? "-"}</Label>
    </div>
  </div>
</div>

<script>
  import Label from "../titles/Label.svelte";
  export let doctorId = "";
  export let doctorName = "Yajat";
  export let doctorRole = "Assistant Surgeon";
</script>

<div class="py-4 flex px-5 items-center gap-3 first:border-y-2 border-b-2">
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src="https://via.placeholder.com/134" class="rounded-full w-10 h-10" />
  <div class="">
    <a
      href="/#/profile/{doctorId}"
      class="font-bold line-clamp-1 max-h-96 hover:text-primary transition-all"
    >
      {doctorName}
    </a>
    <Label styleClass="opacity-40">{doctorRole}</Label>
  </div>
</div>

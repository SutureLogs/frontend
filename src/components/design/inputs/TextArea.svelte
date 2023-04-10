<script>
  export let styleClass = "";
  export let placeholderText = "Placeholder";
  export let label = "Label";
  export let value = "";
</script>

<div class="flex flex-col {styleClass}">
  <label
    for="inpt"
    class="label-text-alt uppercase py-2 font-bold text-[#4669C1] tracking-widest"
  >
    {label}</label
  >
  <textarea
    bind:value
    id="inpt"
    rows="5"
    class="textarea bg-transparent textarea-bordered w-full"
    placeholder={placeholderText}
  />
</div>

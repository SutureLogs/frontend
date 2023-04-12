<script>
  // TODO: make this responsive
  export let styleClass = "";
  export let placeholderText = "Placeholder";
  export let label = "Label";
  export let value = "";
  export let isDisabled = false;
</script>

<div class="flex flex-col {styleClass}">
  <label
    for="inpt"
    class="label-text-alt uppercase py-2 font-bold text-[#4669C1] tracking-widest"
  >
    {label}</label
  >
  <input
    disabled={isDisabled}
    type="text"
    bind:value
    id="inpt"
    class="input bg-transparent input-bordered w-full {isDisabled
      ? 'cursor-not-allowed disabled'
      : ''}"
    placeholder={placeholderText}
  />
</div>

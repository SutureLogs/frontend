<script>
  // TODO: make this responsive
  export let styleClass = "";
  export let placeholderText = "Placeholder";
  export let label = "Label";
  export let value = "";
</script>

<div class="flex flex-col">
  <label
    for="inpt"
    class="label-text-alt uppercase py-2 font-bold text-[#4669C1] tracking-widest"
  >
    {label}</label
  >
  <input
    type="text"
    bind:value
    id="inpt"
    class="input bg-transparent input-bordered w-full"
    placeholder={placeholderText}
  />
</div>

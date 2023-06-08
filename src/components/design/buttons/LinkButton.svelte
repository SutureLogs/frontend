<script>
  export let styleClass = "";
  export let buttonText = "Placeholder";
  export let onClick = () => {};
</script>

<button
  class={`label-text-alt uppercase hover:text-black transition-all  py-2 font-bold text-[#4669C1] tracking-widest  ${styleClass}`}
  on:click={onClick}
>
  {buttonText}
</button>

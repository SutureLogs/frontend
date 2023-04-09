<script>
  export let styleClass = "";
  export let buttonText = "Placeholder";
  export let onClick = () => {};
  export let img = "";
</script>

<button
  class={`label-text-alt flex items-center gap-3 uppercase hover:text-black transition-all  py-2 font-bold text-[#4669C1] tracking-widest  ${styleClass}`}
  on:click={onClick}
>
  <img src={img} class="w-4 h-4" alt="" />
  <div>{buttonText}</div>
</button>

<script>
  // TODO: make this responsive
  export let styleClass = "";
  export let buttonText = "Placeholder";
  export let onClick = () => {};
</script>

<button
  class={`btn m-0 bg-[#4669C1] border-0 w-full text-white   ${styleClass}`}
  on:click={onClick}
>
  {buttonText}
</button>

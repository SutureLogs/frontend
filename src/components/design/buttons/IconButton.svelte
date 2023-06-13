<script>
  export let icon;
  export let styleClass = "";
  export let onClick = () => {};
</script>

<button on:click={onClick} class="btn rounded-full {styleClass}">
  <img src={icon} class="w-4 h-4" alt="" />
</button>

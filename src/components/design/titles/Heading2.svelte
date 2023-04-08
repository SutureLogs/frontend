<script>
  // TODO: make this responsive
  export let styleClass = "";
</script>

<div class={`text-xl md:text-2xl font-bold ${styleClass}`}>
  <slot />
</div>

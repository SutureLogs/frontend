<script>
  // TODO: make this responsive
  export let styleClass = "";
</script>

<div class={`text-sm md:text-base  ${styleClass}`}>
  <slot />
</div>

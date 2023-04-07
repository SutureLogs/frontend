<script>
    // TODO: make this responsive
    export let styleClass= "";
</script>

<div class={`text-sm md:text-xl font-semibold opacity-50 ${styleClass}`}>
    <slot />
</div>
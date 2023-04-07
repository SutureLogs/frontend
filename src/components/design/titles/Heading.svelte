<script>
    // TODO: make this responsive
    export let styleClass= "";
</script>

<div class={`text-2xl md:text-4xl font-bold ${styleClass}`}>
    <slot />
</div>
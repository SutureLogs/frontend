<script>
    // TODO: make this responsive
    export let styleClass= "";
    export let placeholderText = "Placeholder";
    export let label = "Label";
    export let value = "";
</script>

<div class="flex flex-col ">
    <label for="inpt" class="label-text-alt uppercase py-2 font-bold text-[#4669C1] tracking-widest"> {label}</label>
    <input type="password"  bind:value={value} id="inpt" class="input input-bordered w-full" placeholder={placeholderText}>
</div>

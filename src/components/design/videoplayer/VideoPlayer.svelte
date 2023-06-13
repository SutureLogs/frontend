<script>
  import Label from "../titles/Label.svelte";

  export let isPaused = false;
  export let time = 0;
  export let blurSurgeryFilter = false;
  export let videoLink = "";
  export let isSectionsVisible = false;
  export let sectionsTitle = "";

  let BASEURL = import.meta.env.VITE_BASEURL;
</script>

<div class="relative">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    bind:paused={isPaused}
    bind:currentTime={time}
    class="rounded-xl {blurSurgeryFilter ? 'blur-lg' : ''} "
    controls
    src={BASEURL + "/surgery/video/" + videoLink}
  />
  {#if isSectionsVisible}
    <div
      class="absolute flex flex-col top-0 left rounded-br-xl rounded-tl-xl bg-opacity-40 bg-black text-white p-2"
    >
      <Label styleClass="text-white text-xs opacity-60">Now showing</Label>
      <div class=" font-semibold text-sm max-w-xs line-clamp-1">
        {sectionsTitle}
      </div>
    </div>
  {/if}
</div>

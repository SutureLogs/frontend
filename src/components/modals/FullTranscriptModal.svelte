<script>
  export let isViewFullModalOpen = false;
  export let transcript = [];
  export let currentPara = 0;
</script>

<input
  type="checkbox"
  bind:checked={isViewFullModalOpen}
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box bg-white text-black">
    <button
      on:click={() => {
        isViewFullModalOpen = false;
      }}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >
    <h3 class="font-bold text-lg">Full Video Transcript</h3>
    <div class="py-4">
      {#each transcript as para, i}
        <div
          id={"para" + i}
          class={`${currentPara === i ? "opacity-100" : "opacity-30"}`}
        >
          <p>{para}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

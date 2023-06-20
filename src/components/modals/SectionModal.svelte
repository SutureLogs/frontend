<script>
  import PoweredByAi from "../design/titles/PoweredByAI.svelte";

  export let isSectionsModalVisible = false;
  export let isSectionsVisible = false;
  export let sections = [
    { startTime: 0, endTime: 10, title: "Some random step in the surgery" },
    { startTime: 10, endTime: 20, title: "Some random step in the surgery 2" },
  ];
  export let timestamp = 0;
</script>

<input
  type="checkbox"
  bind:checked={isSectionsModalVisible}
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box bg-white text-black">
    <button
      on:click={() => {
        isSectionsModalVisible = false;
      }}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >

    <div class="flex gap-3 items-center">
      <h3 class="font-bold text-lg">Sections in Video</h3>
      <input type="checkbox" bind:checked={isSectionsVisible} class="toggle" />
    </div>
    <PoweredByAi />
    <div class="py-4">
      {#each sections as section, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => {
            timestamp = section.startTime;
            isSectionsModalVisible = false;
          }}
          class="flex cursor-pointer p-2 border border-b-0 last:border-b px-4 justify-between items-center {timestamp >=
            section.startTime && timestamp <= section.endTime
            ? 'border-l-4 border-l-primary font-bold'
            : 'hover:border-l-4'}"
        >
          <div>
            {index + 1}. {section.title}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

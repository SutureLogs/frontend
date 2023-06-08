<script>
  import { nanoid } from "nanoid";
  export let isModalOpen = false;
  let isVideoModalOpen = false;
  let isPictureModalOpen = false;
  export let noteElements = [];
  let vidURL = "";
  let imgURL = "";
  let video;
  let picture;
  let pictureAltText = "";

  function saveNote() {
    // upload note to backend
    isModalOpen = false;
  }

  function addVideoElement() {
    // upload video to backend
    // get video url
    noteElements = [
      ...noteElements,
      {
        id: nanoid(),
        elementType: "video",
        vidURL: "https://via.placeholder.com/1200",
      },
    ];
    isVideoModalOpen = false;
  }
  function addPhotoElement() {
    // upload photo
    // get photo url
    noteElements = [
      ...noteElements,
      {
        id: nanoid(),
        elementType: "image",
        imgURL: "https://via.placeholder.com/1200",
        altText: pictureAltText,
      },
    ];
    isPictureModalOpen = false;
  }
  function addTextElement() {
    noteElements = [
      ...noteElements,
      { id: nanoid(), elementType: "text", textContent: "" },
    ];
  }
  $: console.log(noteElements);
</script>

<input type="checkbox" checked={isVideoModalOpen} class="modal-toggle" />
<div class="modal z-50">
  <div class="modal-box">
    <button
      on:click={() => (isVideoModalOpen = false)}
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
    >
    <h3 class="font-bold text-lg">Add Video</h3>
    <div class="py-4 flex gap-2 items-center">
      <input
        bind:value={video}
        type="file"
        class="file-input file-input-bordered w-full rounded-2xl"
      />
      <button on:click={addVideoElement} class="btn rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
<input type="checkbox" checked={isPictureModalOpen} class="modal-toggle" />
<div class="modal z-50">
  <div class="modal-box">
    <button
      on:click={() => (isPictureModalOpen = false)}
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
    >
    <h3 class="font-bold text-lg">Add Picture</h3>
    <div class="py-4 flex flex-col gap-2">
      <input
        bind:value={picture}
        type="file"
        class="file-input file-input-bordered w-full rounded-2xl"
      />
      <input
        type="text"
        bind:value={pictureAltText}
        class="input input-bordered rounded-2xl"
        placeholder="Alt Text"
      />
      <button
        on:click={addPhotoElement}
        class="btn rounded-2xl mt-4 bg-[#4669C1] border-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>
    </div>
  </div>
</div>

<input type="checkbox" checked={isVideoModalOpen} class="modal-toggle" />
<div class="modal z-50">
  <div class="modal-box">
    <button
      on:click={() => (isVideoModalOpen = false)}
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
    >
    <h3 class="font-bold text-lg">Add Video</h3>
    <div class="py-4 flex gap-2 items-center">
      <input
        bind:value={video}
        type="file"
        class="file-input file-input-bordered w-full rounded-2xl"
      />
      <button on:click={addVideoElement} class="btn rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>
    </div>
  </div>
</div>

<input type="checkbox" checked={isModalOpen} class="modal-toggle" />
<div class="modal z-10">
  <div class="modal-box max-w-3xl">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold my-3">Add a note</h3>
      <div class="flex gap-3">
        <button on:click={addTextElement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
        <button on:click={() => (isVideoModalOpen = true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
        <button on:click={() => (isPictureModalOpen = true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      {#each noteElements as element}
        <div class="flex w-full items-center gap-3">
          {#if element.elementType === "text"}
            <textarea
              class="rounded-2xl flex-1 p-3 border-2 border-gray-300"
              placeholder="Enter text here..."
              bind:value={element.textContent}
            />
          {/if}
          {#if element.elementType === "video"}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video src={element.vidURL} />
          {/if}
          {#if element.elementType === "image"}
            <img
              src={element.imgURL}
              class="w-full h-56 object-scale-down"
              alt=""
            />
          {/if}
          <button
            on:click={() => {
              noteElements = noteElements.filter((el) => el.id !== element.id);
            }}
            class="btn btn-sm btn-circle btn-ghost">✕</button
          >
        </div>
      {/each}
      {#if noteElements.length === 0}
        <p
          class="text-gray-500 border p-10 flex items-center justify-center rounded-2xl border-dashed opacity-80"
        >
          Add a note element to get started
        </p>
      {/if}
    </div>
    <div class="modal-action">
      <button
        on:click={() => (isModalOpen = false)}
        class="btn btn-outline rounded-2xl">Close</button
      >
      <button on:click={saveNote} class="btn rounded-2xl">Save Note</button>
    </div>
  </div>
</div>

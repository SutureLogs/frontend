<script>
  import { push } from "svelte-spa-router";
  export let surgeryName;
  export let doctorName;
  export let doctorTitle;
  export let doctorImage;
  export let surgeryImage;
  export let orgName;
  export let logID;
  export let likesCount;
  export let videoLink;
  export let tags;
  let BASEURL = import.meta.env.VITE_BASEURL;

  let isVideoVisible = false;
  let videoTimer;
  const startTimer = () => {
    if (videoTimer) clearTimeout(videoTimer);
    videoTimer = setTimeout(() => {
      isVideoVisible = true;
    }, 1000);
  };
  const stopTimer = () => {
    if (videoTimer) clearTimeout(videoTimer);
    isVideoVisible = false;
  };

  const navigate = () => {
    push("/base/" + logID);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={navigate}
  on:mouseenter={startTimer}
  on:mouseleave={stopTimer}
  class="flex flex-col hover:scale-95 transition-all duration-300 cursor-pointer"
>
  <!-- svelte-ignore a11y-media-has-caption -->
  {#if isVideoVisible}
    <video
      autoplay
      muted
      loop
      class="rounded-lg"
      src={BASEURL + "/surgery/video/" + videoLink}
    />
  {:else}
    <img
      src={BASEURL + "/surgery/img/" + surgeryImage}
      alt=""
      class="rounded-lg"
    />
  {/if}

  <div class="flex">
    <div class="text-lg font-bold my-2">{surgeryName}</div>
    <div class="flex gap-1 items-center ml-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
        />
      </svg>
      <div>{likesCount}</div>
    </div>
  </div>
  {#if tags}
    <div class="pb-2 flex gap-2 flex-wrap">
      {#each tags as tag}
        <div class="badge text-xs badge-outline">{tag}</div>
      {/each}
    </div>
  {/if}
  <div class="flex items-center gap-2 mt-2">
    <img
      src={doctorImage
        ? BASEURL + "/surgery/img/" + doctorImage
        : `https://api.dicebear.com/6.x/initials/svg?seed=${doctorName}`}
      class="w-10 h-10 rounded-full object-cover"
      alt=""
    />
    <div class="flex flex-col">
      <div class="text- font-bold text-gray-500">
        {doctorName}, {doctorTitle}
      </div>
      <div class=" text-sm text-gray-400">{orgName}</div>
    </div>
  </div>
</div>

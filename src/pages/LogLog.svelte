<script>
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import Label from "../components/design/titles/Label.svelte";
  export let params;
  let videoTimestamps = [0, 10, 20, 30];
  let vitalTimestamps = [0, 10, 20, 30];
  let vitals = [
    {
      name: "Heart Rate",
      unit: "bpm",
      values: [60, 70, 80, 90, 100, 110],
    },
    {
      name: "Blood Pressure",
      unit: "mmHg",
      values: [120, 130, 140, 150, 160, 170],
    },
    {
      name: "Respiratory Rate",
      unit: "bpm",
      values: [12, 13, 14, 15, 16, 17],
    },
  ];
  let transcript = [
    "Hello, welcome to the video player",
    "Paragraph 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium impedit! Fuga, saepe. In eum quo blanditiis architecto sequi non placeat perspiciatis, repudiandae labore quis voluptates excepturi asperiores quas ducimus!",
    "Paragraph 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium impedit! Fuga, saepe. In eum quo blanditiis architecto sequi non placeat perspiciatis, repudiandae labore quis voluptates excepturi asperiores quas ducimus!",
    "Paragraph 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium impedit! Fuga, saepe. In eum quo blanditiis architecto sequi non placeat perspiciatis, repudiandae labore quis voluptates excepturi asperiores quas ducimus!",
  ];
  let time;
  let currentPara = 2;
  let currentVital = 0;

  $: {
    if (time < videoTimestamps[0]) {
      currentPara = 0;
    } else if (time >= videoTimestamps[videoTimestamps.length - 1]) {
      currentPara = videoTimestamps.length - 1;
    } else {
      for (let i = 0; i < videoTimestamps.length; i++) {
        if (time < videoTimestamps[i]) {
          currentPara = i - 1;
          break;
        }
      }
    }
    if (time < vitalTimestamps[0]) {
      currentVital = 0;
    } else if (time === vitalTimestamps[vitalTimestamps.length - 1]) {
      currentVital = vitalTimestamps.length - 1;
    } else if (time > vitalTimestamps[vitalTimestamps.length - 1]) {
      currentVital = -1;
    } else {
      for (let i = 0; i < vitalTimestamps.length; i++) {
        if (time < vitalTimestamps[i]) {
          currentVital = i - 1;
          break;
        }
      }
    }
  }
</script>

<LayoutWithLogNav {params}>
  <div class="flex p-10">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      bind:currentTime={time}
      controls
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    />
  </div>
  <div class="flex">
    {#each vitals as vital}
      <div class="flex flex-col gap-2 p-2">
        {#if currentVital !== -1}
          <Label>{vital.name}</Label>
          <Label>{vital.values[currentVital]} {vital.unit}</Label>
        {:else}
          <Label>{vital.name}</Label>
          <Label>- {vital.unit}</Label>
        {/if}
      </div>
    {/each}
  </div>
  {#each transcript as para, i}
    <div
      id={"para" + i}
      class={`p-10 ${currentPara === i ? "opacity-100" : "opacity-30"}`}
    >
      <p>{para}</p>
    </div>
  {/each}
</LayoutWithLogNav>

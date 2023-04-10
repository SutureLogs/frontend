<script>
  import { push } from "svelte-spa-router";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import left from "../assets/icons/left.png";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Subheading from "../components/design/titles/Subheading.svelte";
  import { Line } from "svelte-chartjs";
  import "chart.js/auto";

  export let params;

  let time;
  let currentPara = 0;
  let currentVital = 0;
  let data = {
    orgName: "Org Name",
    surgeonName: "Surgeon Name",
    surgeonTitle: "Surgeon Title",
    surgeryName: "Surgery Name",
    date: "22/3/12",
    videoTimestamps: [0, 10, 20, 30],
    vitalTimestamps: [0, 10, 20, 30],
    transcript: [
      "Hello, welcome to the video player",
      "Paragraph 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium impedit! Fuga, saepe. In eum quo blanditiis architecto sequi non placeat perspiciatis, repudiandae labore quis voluptates excepturi asperiores quas ducimus!",
      "Paragraph 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium impedit! Fuga, saepe. In eum quo blanditiis architecto sequi non placeat perspiciatis, repudiandae labore quis voluptates excepturi asperiores quas ducimus!",
      "Paragraph 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium impedit! Fuga, saepe. In eum quo blanditiis architecto sequi non placeat perspiciatis, repudiandae labore quis voluptates excepturi asperiores quas ducimus!",
    ],
    vitals: [
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
    ],
  };

  $: {
    if (time < data.videoTimestamps[0]) {
      currentPara = 0;
    } else if (time >= data.videoTimestamps[data.videoTimestamps.length - 1]) {
      currentPara = data.videoTimestamps.length - 1;
    } else {
      for (let i = 0; i < data.videoTimestamps.length; i++) {
        if (time < data.videoTimestamps[i]) {
          currentPara = i - 1;
          break;
        }
      }
    }
    if (time < data.vitalTimestamps[0]) {
      currentVital = 0;
    } else if (time === data.vitalTimestamps[data.vitalTimestamps.length - 1]) {
      currentVital = data.vitalTimestamps.length - 1;
    } else if (time > data.vitalTimestamps[data.vitalTimestamps.length - 1]) {
      currentVital = -1;
    } else {
      for (let i = 0; i < data.vitalTimestamps.length; i++) {
        if (time < data.vitalTimestamps[i]) {
          currentVital = i - 1;
          break;
        }
      }
    }
  }
</script>

<LayoutWithLogNav {params}>
  <div class="grid md:grid-cols-3 h-full">
    <div class="md:col-span-2 border-r-2 h-full">
      <div class="p-10 flex flex-col md:flex-row justify-between items-center">
        <LinkIconButton
          buttonText={"Go back to browse"}
          onClick={() => {
            push("/browse");
          }}
          img={left}
        />
        <div class="flex gap-2 items-center">
          <Label styleClass="opacity-50">Conducted on</Label>
          <Label>{data.date}</Label>
        </div>
      </div>
      <div class="bg-slate-100 p-10">
        <Label>{data.orgName}</Label>
        <Heading2 styleClass="mt-2">{data.surgeonName}</Heading2>
        <div class="flex gap-3 items-center mt-3">
          <Subheading>{data.surgeonName}</Subheading>
          <div class="w-2 h-2 bg-primary rounded-full" />
          <Subheading>{data.surgeonTitle}</Subheading>
        </div>
      </div>
      <!-- svelte-ignore a11y-media-has-caption -->
      <div class="p-10 pt-5 flex flex-col">
        <video
          bind:currentTime={time}
          class="rounded-xl"
          controls
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        />
        <div class="h-96 overflow-auto mt-4">
          {#each data.transcript as para, i}
            <div
              id={"para" + i}
              class={`p-2 ${currentPara === i ? "opacity-100" : "opacity-30"}`}
            >
              <p>{para}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="px-6 py-12 md:fixed h-full overflow-y-scroll">
        <div class="">
          <Label styleClass="text-primary">Vitals</Label>
          <div class="flex flex-wrap justify-evenly mt-4">
            {#each data.vitals as vital}
              <div
                class="flex items-center justify-between border-b-2 gap-2 p-3 w-full"
              >
                {#if currentVital !== -1}
                  <Label styleClass="text-lg"
                    >{vital.values[currentVital]} {vital.unit}</Label
                  >
                  <Label styleClass="opacity-50">{vital.name}</Label>
                {:else}
                  <Label>{vital.name}</Label>
                  <Label>- {vital.unit}</Label>
                {/if}
              </div>
            {/each}
          </div>
          <div class="flex flex-col mt-10">
            {#each data.vitals as vital}
              <Line
                data={{
                  labels: data.vitalTimestamps,
                  datasets: [{ label: vital.name, data: vital.values }],
                }}
              />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="flex p-10">
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
  {/each} -->
</LayoutWithLogNav>

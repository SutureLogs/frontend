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
  import { store } from "../stores/store";
  import moment from "moment";
  import axios from "axios";
  import { onMount } from "svelte";
  import Loading from "../components/Loading.svelte";
  let BASEURL = import.meta.env.VITE_BASEURL;

  export let params;
  let loading = false;
  async function dataload() {
    loading = true;
    let response = await axios.get(
      BASEURL + "/surgery/loglog?id=" + params.id,
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    loading = false;
    data = response.data.surgery;
  }
  onMount(async () => {
    await dataload();
  });

  let time;
  let isPaused = false;
  let currentPara = 0;
  let currentVital = 0;
  let data = {
    orgName: "Org Name",
    surgeonName: "Surgeon Name",
    surgeonTitle: "Surgeon Title",
    surgeryName: "Surgery Name",
    date: "22/3/12",
    videoLink:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
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
    if (data.videoTimestamps) {
      if (time < data.videoTimestamps[0]) {
        currentPara = 0;
      } else if (
        time >= data.videoTimestamps[data.videoTimestamps.length - 1]
      ) {
        currentPara = data.videoTimestamps.length - 1;
      } else {
        for (let i = 0; i < data.videoTimestamps.length; i++) {
          if (time < data.videoTimestamps[i]) {
            currentPara = i - 1;
            break;
          }
        }
      }
    }
    if (data.vitalTimestamps) {
      if (time < data.vitalTimestamps[0]) {
        currentVital = 0;
      } else if (
        time === data.vitalTimestamps[data.vitalTimestamps.length - 1]
      ) {
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
  }
</script>

<LayoutWithLogNav {params}>
  {#if loading}
    <Loading />
  {:else}
    <div class="grid md:grid-cols-3 h-full">
      <div class="md:col-span-2 border-r-2 h-full">
        <div
          class="p-10 flex flex-col md:flex-row justify-between items-center"
        >
          <LinkIconButton
            buttonText={"Go back to browse"}
            onClick={() => {
              push("/browse");
            }}
            img={left}
          />
          <div class="flex gap-2 items-center">
            <Label styleClass="opacity-50">Conducted on</Label>
            <Label>{moment(data.date).format("DD MMMM, YYYY")}</Label>
          </div>
        </div>
        <div class="bg-slate-100 p-10">
          <Label>{data.orgName}</Label>
          <Heading2 styleClass="mt-2">{data.surgeryName}</Heading2>
          <div class="flex gap-3 items-center mt-3">
            <Subheading>{data.surgeonName}</Subheading>
            <div class="w-2 h-2 bg-primary rounded-full" />
            <Subheading>{data.surgeonTitle}</Subheading>
          </div>
        </div>
        <!-- svelte-ignore a11y-media-has-caption -->
        <div class="p-10 pt-5 flex flex-col relative">
          <video
            bind:paused={isPaused}
            bind:currentTime={time}
            class="rounded-xl {$store.blurSurgeryFilter ? 'blur-lg' : ''} "
            controls
            src={BASEURL + "/surgery/video/" + data.videoLink}
          />
          <div class="flex justify-end py-3">
            {#if !$store.blurSurgeryFilter}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={() => {
                  $store.blurSurgeryFilter = true;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={() => {
                  $store.blurSurgeryFilter = false;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"
                  />
                  <path
                    d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"
                  />
                  <path
                    d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"
                  />
                </svg>
              </div>
            {/if}
          </div>
          <div class="h-96 overflow-auto mt-4">
            {#if data.transcript.length === 0}
              <div class="flex justify-center items-center">
                <Loading
                  >Waiting for transcript. Please check back in a while
                </Loading>
              </div>
            {:else}
              {#each data.transcript as para, i}
                <div
                  id={"para" + i}
                  class={`p-2 ${
                    currentPara === i ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <p>{para}</p>
                </div>
              {/each}
            {/if}
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
  {/if}

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

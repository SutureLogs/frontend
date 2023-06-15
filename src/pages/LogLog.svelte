<script>
  import { pop, push } from "svelte-spa-router";
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
  import GoBackToBrowseButton from "../components/design/buttons/GoBackToBrowseButton.svelte";
  import VideoPlayer from "../components/design/videoplayer/VideoPlayer.svelte";
  import FullTranscriptModal from "../components/modals/FullTranscriptModal.svelte";
  import SectionModal from "../components/modals/SectionModal.svelte";
  import LogHeader from "../components/LogHeader.svelte";
  import toast from "svelte-french-toast";
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
    if (response.data.message === "Not allowed") {
      toast.error("You are not allowed to view this log");
      pop();
      return;
    }
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
  let currentSection = 0;
  let data = {
    likesCount: 0,
    isLiked: false,
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
    sectionsInVideo: [
      {
        title: "Section 1",
        startTime: 0,
        endTime: 10,
      },
      {
        title: "Section 2",
        startTime: 10,
        endTime: 15,
      },
    ],
  };
  let isViewFullModalOpen = false;
  let isSectionsModalVisible = false;
  let isSectionsVisible = true;

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
    if (data.sectionsInVideo) {
      for (let i = 0; i < data.sectionsInVideo.length; i++) {
        if (
          time >= data.sectionsInVideo[i].startTime &&
          time <= data.sectionsInVideo[i].endTime
        ) {
          currentSection = i;
          break;
        }
      }
    }
  }
</script>

<FullTranscriptModal
  {currentPara}
  bind:isViewFullModalOpen
  transcript={data.transcript}
/>

<SectionModal
  bind:isSectionsVisible
  bind:isSectionsModalVisible
  bind:timestamp={time}
  sections={data.sectionsInVideo || []}
/>

<LayoutWithLogNav {params}>
  {#if loading}
    <Loading />
  {:else}
    <div class="grid md:grid-cols-3 h-full">
      <div class="md:col-span-2 border-r-2 h-full">
        <div
          class="p-10 flex flex-col md:flex-row justify-between items-center"
        >
          <GoBackToBrowseButton />
          <div class="flex gap-2 items-center">
            <Label styleClass="opacity-50">Conducted on</Label>
            <Label>{moment(data.date).format("DD MMMM, YYYY")}</Label>
          </div>
        </div>
        <LogHeader
          bind:isLiked={data.isLiked}
          bind:likeCount={data.likesCount}
          orgName={data.orgName}
          surgeonName={data.surgeonName}
          surgeonTitle={data.surgeonTitle}
          surgeryName={data.surgeryName}
          surgeryId={params.id}
        />
        <!-- svelte-ignore a11y-media-has-caption -->
        <div class="p-10 pt-5 flex flex-col relative">
          <div class="flex gap-4 items-center justify-end cursor-pointer pb-4">
            <button on:click={() => (isSectionsModalVisible = true)}>
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
                  d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                />
              </svg>
            </button>
            <div>
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
          </div>
          <div>
            <VideoPlayer
              blurSurgeryFilter={$store.blurSurgeryFilter}
              bind:isPaused
              bind:time
              videoLink={data.videoLink}
              {isSectionsVisible}
              sectionsTitle={data.sectionsInVideo
                ? data.sectionsInVideo[currentSection].title
                : ""}
            />
          </div>

          <div class=" cursor-pointer mt-7">
            {#if data.transcript.length === 0}
              <div class="flex justify-center items-center">
                <Loading
                  >Waiting for transcript. Please check back in a while
                </Loading>
              </div>
            {:else}
              <div class="flex justify-between flex-wrap gap-5 items-center">
                <div class="">
                  <div class="opacity-30 text-xl">
                    {currentPara == 0 ? "" : data.transcript[currentPara - 1]}
                  </div>
                  <div class="text-xl font-semibold">
                    {data.transcript[currentPara]}
                  </div>
                  <div class="opacity-30 text-xl">
                    {currentPara == data.transcript.length - 1
                      ? ""
                      : data.transcript[currentPara + 1]}
                  </div>
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  on:click={() => (isViewFullModalOpen = true)}
                  class=" hover:scale-95 transition-all cursor-pointer flex gap-3 items-center"
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
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
              </div>
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
                    <Label>- {vital.unit}</Label>
                    <Label>{vital.name}</Label>
                  {/if}
                </div>
              {/each}
            </div>
            <div class="flex flex-col mt-10">
              {#each data.vitals as vital}
                <Line
                  options={{
                    animation: false,
                  }}
                  data={{
                    labels: data.vitalTimestamps,
                    datasets: [
                      {
                        label: vital.name,
                        data: vital.values.slice(0, currentVital),
                      },
                    ],
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

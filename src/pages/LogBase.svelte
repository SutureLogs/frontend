<script>
  import left from "../assets/icons/left.png";
  import brokenlink from "../assets/icons/brokenlink.png";
  import right from "../assets/icons/right.png";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Subheading from "../components/design/titles/Subheading.svelte";
  import PatientDetailsTable from "../components/design/tables/PatientDetailsTable.svelte";
  import SurgeryDetailsTable from "../components/design/tables/SurgeryDetailsTable.svelte";
  import PatientHistoryCard from "../components/design/cards/PatientHistoryCard.svelte";
  import { pop, push } from "svelte-spa-router";
  import axios from "axios";
  import { store } from "../stores/store";
  import { onMount } from "svelte";
  import moment from "moment";
  import Loading from "../components/Loading.svelte";
  import GoBackToBrowseButton from "../components/design/buttons/GoBackToBrowseButton.svelte";
  import LogHeader from "../components/LogHeader.svelte";
  import toast from "svelte-french-toast";
  import PoweredByAi from "../components/design/titles/PoweredByAI.svelte";
  let loading = false;
  onMount(async () => {
    await dataload();
  });
  async function dataload() {
    loading = true;
    let response = await axios.get(
      BASEURL + "/surgery/get-logbase?id=" + params.id,
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

  let BASEURL = import.meta.env.VITE_BASEURL;

  let data = {
    likesCount: 0,
    isLiked: false,
    orgName: "Org Name",
    surgeonName: "Surgeon Name",
    surgeonTitle: "Surgeon Title",
    surgeryName: "Surgery Name",
    date: "22/3/12",
    patientDetails: {
      age: 45,
      gender: "Airplane",
    },
    patientHistory: [
      {
        surgeryName: "surgeryName",
        surgeonName: "surgeonName",
        surgeonTitle: "surgeonTitle",
        orgName: "orgName",
        date: "date",
        logID: "logID",
      },
    ],
    surgeryDetails: {
      surgeryDurationInMins: 2,
      team: [
        {
          doctorId: "1",
          doctorName: "Dr. John Doe",
          role: "Surgeon",
        },
        {
          doctorId: "13",
          doctorName: "Jane Doe",
          role: "Nurse",
        },
      ],
    },
  };

  export let params = {};
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
        {#if "summary" in data && data.summary !== ""}
          <div class="p-10 flex gap-2 flex-col">
            <div
              class="flex justify-between items-center pb-3 border-b-2 -pb-4"
            >
              <Label styleClass="text-primary  ">SURGERY DESCRIPTION</Label>
              <PoweredByAi>Powered by AI</PoweredByAi>
            </div>
            {data.summary}
          </div>
        {/if}

        <PatientDetailsTable styleClass="p-10 " {...data.patientDetails} />
        <SurgeryDetailsTable
          styleClass="p-10"
          duration={data.surgeryDetails.surgeryDurationInMins}
          team={data.surgeryDetails.team}
        />
      </div>
      <div class="py-12 px-6">
        <div class="flex justify-between items-center">
          <Label styleClass="text-primary m-0 p-0 pt-1">Patient history</Label>
          <div class="flex gap-1 items-center group">
            {#if data.patientDetails && data.patientDetails.patientId}
              <button
                on:click={() =>
                  push(
                    `/patient/${data.patientDetails.patientId}/${params.id}`
                  )}
                class="btn btn-xs text-xs gap-1 rounded-xl"
              >
                <div class="text-[10px]">View All Notes</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 transition-all"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            {/if}
          </div>
        </div>
        <div class="flex flex-col gap-3 h-full max-h-screen">
          {#if data.patientHistory.length == 0}
            <div class="flex h-full justify-center items-center gap-3 flex-col">
              <img src={brokenlink} alt="" />
              <Label>No History Available</Label>
            </div>
          {/if}
          {#each data.patientHistory as history}
            <PatientHistoryCard
              logID={history.surgeryId}
              date={history.surgeryDate}
              surgeryName={history.surgeryName}
              surgeonName={history.surgeonName}
              surgeonTitle={history.surgeonTitle}
              orgName={history.surgeryOrg}
            />
          {/each}
        </div>
      </div>
    </div>
  {/if}
</LayoutWithLogNav>

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
  import { push } from "svelte-spa-router";
  import axios from "axios";
  import { store } from "../stores/store";
  import { onMount } from "svelte";
  import moment from "moment";
  import Loading from "../components/Loading.svelte";
  import LinkButton from "../components/design/buttons/LinkButton.svelte";
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
    loading = false;
    data = response.data.surgery;
  }

  let BASEURL = import.meta.env.VITE_BASEURL;

  let data = {
    likeCount: 0,
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
        <PatientDetailsTable styleClass="p-10" {...data.patientDetails} />
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
              <LinkButton
                buttonText="View Notes"
                onClick={() => {
                  push(
                    "/patient/" +
                      data.patientDetails.patientId +
                      "/" +
                      params.id
                  );
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-primary group-hover:text-black transition-all"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
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

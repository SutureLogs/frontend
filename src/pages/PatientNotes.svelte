<script>
  import axios from "axios";
  import empty from "../assets/icons/empty.png";
  import LayoutForPatientNotes from "../components/LayoutForPatientNotes.svelte";
  import Notes from "../components/Notes.svelte";
  import NotesNav from "../components/NotesNav.svelte";
  import NotesDetailsBar from "../components/NotesDetailsBar.svelte";
  import AddNoteModal from "../components/AddNoteModal.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import { store } from "../stores/store";
  import { onMount } from "svelte";
  import Loading from "../components/Loading.svelte";
  import GoBack from "../components/design/buttons/GoBack.svelte";
  let isAddNoteModalOpen = false;
  let loading = true;
  let BASEURL = import.meta.env.VITE_BASEURL;
  export let params = {};
  let data = {
    surgeries: [
      {
        surgeryName: "Surgery Name",
        surgeryId: "1",
      },
      {
        surgeryName: "Surgery Name",
        surgeryId: "2",
      },
    ],
    currentSurgeryDetail: {
      surgeryName: "Name",
      surgeryId: "2",
      surgeryDate: "",
      organizationName: "Organization Name",
      surgicalTeamName: [
        {
          doctorName: "Dr. John Doe1",
          doctorRole: "Surgeon1",
          doctorId: "11",
        },
      ],
    },
    patientDetails: {
      age: 231,
      gender: "Male",
    },
    notes: [
      {
        createdAt: "2021-08-10T12:00:00.000Z",
        user: {
          name: "Dr. John Doe",
          id: "1",
          img: "https://via.placeholder.com/1000",
        },
        note: [
          {
            imgURL: "https://via.placeholder.com/1000",
            elementType: "image",
            altText: "This is an image note",
          },

          {
            textContent: "This is a text note",
            elementType: "text",
          },
          {
            vidURL:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            elementType: "video",
          },
        ],
      },
      {
        createdAt: "2021-08-10T12:00:00.000Z",
        user: {
          name: "Dr. John Doe",
        },

        note: [
          {
            textContent: "This is a text note",
            elementType: "text",
          },
          {
            textContent: "This is a text note",
            elementType: "text",
          },
          {
            textContent: "This is a text note",
            elementType: "text",
          },
        ],
      },
    ],
  };
  onMount(async () => {
    await dataload();
  });
  async function dataload() {
    loading = true;
    const response = await axios.get(
      BASEURL + `/surgery/get-patient-notes/${params.sid}/${params.pid}`,
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    loading = false;
    data = response.data.result;
  }
</script>

<LayoutForPatientNotes>
  {#if loading}
    <Loading />
  {:else}
    <AddNoteModal
      bind:isModalOpen={isAddNoteModalOpen}
      surgeryId={params.sid}
      refreshData={dataload}
    />
    <div class="xl:grid xl:grid-cols-5 h-full">
      <NotesNav
        patientId={params.pid}
        currentSurgeryDetail={data.currentSurgeryDetail}
        surgeries={data.surgeries}
      />
      <div class="flex flex-col xl:col-start-2 xl:col-span-3 xl:border-r-2">
        {#if data.notes && data.notes.length > 0}
          <div class="flex w-full justify-between xl:px-48 pt-10 px-3">
            <GoBack />
            <button
              on:click={() => (isAddNoteModalOpen = true)}
              class="btn flex gap-3 items-center rounded-2xl bg-primary border-0"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Note
            </button>
          </div>
          {#each data.notes as notes}
            <Notes
              notes={notes.note}
              createdAt={notes.createdAt}
              doctorImage={notes.user.img}
              doctorName={notes.user.name}
            />
          {/each}
        {:else}
          <div
            class="flex flex-col items-center justify-center h-full gap-3 opacity-50"
          >
            <img src={empty} alt="" />
            <h1 class="text-2xl font-bold">No notes found</h1>
            <button
              class="my-3 btn btn-outline rounded-2xl"
              on:click={() => (isAddNoteModalOpen = true)}
              >Add a new note</button
            >
          </div>
        {/if}
      </div>
      <div class="relative">
        <NotesDetailsBar
          patientAge={data.patientDetails.age}
          patientGender={data.patientDetails.gender}
          orgName={data.currentSurgeryDetail.organizationName}
          surgeryName={data.currentSurgeryDetail.surgeryName}
          surgeryDate={data.currentSurgeryDetail.surgeryDate}
          surgicalTeamName={data.currentSurgeryDetail.surgicalTeamName}
        />
      </div>
    </div>
  {/if}
</LayoutForPatientNotes>

<script>
  import LayoutForPatientNotes from "../components/LayoutForPatientNotes.svelte";
  import Notes from "../components/Notes.svelte";
  import NotesNav from "../components/NotesNav.svelte";
  import NotesDetailsBar from "../components/NotesDetailsBar.svelte";
  import AddNoteModal from "../components/AddNoteModal.svelte";
  let isAddNoteModalOpen = false;
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
      age: 23,
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
</script>

<LayoutForPatientNotes>
  <AddNoteModal bind:isModalOpen={isAddNoteModalOpen} />
  <div class="xl:grid xl:grid-cols-5 h-full">
    <NotesNav
      patientId={params.pid}
      currentSurgeryDetail={data.currentSurgeryDetail}
      surgeries={data.surgeries}
    />
    <div
      class="flex flex-col justify-center items-center xl:col-start-2 xl:col-span-3 xl:border-r-2"
    >
      <div class="self-end xl:px-48 pt-10 px-3">
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
    </div>
    <div class="relative">
      <NotesDetailsBar
        surgicalTeamName={data.currentSurgeryDetail.surgicalTeamName}
      />
    </div>
  </div>
</LayoutForPatientNotes>

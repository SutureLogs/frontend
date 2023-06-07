<script>
  import PatientSurgeryButton from "../components/design/buttons/PatientSurgeryButton.svelte";
  import LayoutForPatientNotes from "../components/LayoutForPatientNotes.svelte";
  import logo from "../assets/logoblack.png";
  import Label from "../components/design/titles/Label.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import PatientDetailsTable from "../components/design/tables/PatientDetailsTable.svelte";
  import Notes from "../components/Notes.svelte";
  import NotesNav from "../components/NotesNav.svelte";
  import NotesDetailsBar from "../components/NotesDetailsBar.svelte";

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
      surgeryId: "1",
      surgeryDate: "",
      organizationName: "Organization Name",
      surgicalTeamName: [
        {
          doctorName: "Dr. John Doe",
          doctorRole: "Surgeon",
          doctorId: "1",
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
  <div class="xl:grid xl:grid-cols-5 h-full">
    <NotesNav
      currentSurgeryDetail={data.currentSurgeryDetail}
      surgeries={data.surgeries}
    />
    <div
      class="flex flex-col justify-center items-center xl:col-start-2 xl:col-span-3"
    >
      {#each data.notes as notes}
        <Notes
          notes={notes.note}
          createdAt={notes.createdAt}
          doctorImage={notes.user.img}
          doctorName={notes.user.name}
        />
      {/each}
    </div>
    <div class="relative pt-10">
      <NotesDetailsBar />
    </div>
  </div>
</LayoutForPatientNotes>

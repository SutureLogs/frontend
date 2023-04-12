<script>
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import left from "../assets/icons/left.png";
  import Label from "../components/design/titles/Label.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Subheading from "../components/design/titles/Subheading.svelte";
  import PatientDetailsTable from "../components/design/tables/PatientDetailsTable.svelte";
  import SurgeryDetailsTable from "../components/design/tables/SurgeryDetailsTable.svelte";
  import PatientHistoryCard from "../components/design/cards/PatientHistoryCard.svelte";
  import { push } from "svelte-spa-router";
  import NotesDetailsTable from "../components/design/tables/NotesDetailsTable.svelte";

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
          userID: "1",
          name: "Dr. John Doe",
          role: "Surgeon",
        },
        {
          userID: "13",
          name: "Jane Doe",
          role: "Nurse",
        },
      ],
    },
    notes: [
      {
        surgeonName: "Yajat",
        userID: "yajat",
        note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
      },

      {
        surgeonName: "Danny Boi",
        userID: "danyy",
        note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
      },
    ],
  };

  export let params = {};
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
      <NotesDetailsTable styleClass="p-10" data={data.notes} />
    </div>
    <div class="py-12 px-6">
      <Label styleClass="text-primary">Patient history</Label>
      <div class="flex flex-col gap-3">
        {#each data.patientHistory as history}
          <PatientHistoryCard {...history} />
        {/each}
      </div>
    </div>
  </div>
</LayoutWithLogNav>

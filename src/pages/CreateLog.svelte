<script>
  // @ts-nocheck

  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import DateInput from "../components/design/inputs/DateInput.svelte";
  import FileInput from "../components/design/inputs/FileInput.svelte";
  import ListInput from "../components/design/inputs/ListInput.svelte";
  import TextArea from "../components/design/inputs/TextArea.svelte";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import NotesDetailsTable from "../components/design/tables/NotesDetailsTable.svelte";
  import SurgeryTeamTable from "../components/design/tables/SurgeryTeamTable.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Label from "../components/design/titles/Label.svelte";

  let surgeryVideoFile = null;
  let surgeryThumbnailFile = null;
  // get previous surgery notes from server
  //add surgery notes to previous surgery notes in data object before sending to server
  let surgeryNote = "";
  let data = {
    surgeryName: "",
    surgeryDate: "",
    surgeryOrg: "",
    surgeryVisibility: "",
    surgeryTeam: [
      {
        memberUsername: "Dr. John Doe",
        memberRole: "Surgeon",
      },
    ],
    surgeryNotes: [
      {
        surgeonName: "Yajat",
        userID: "yajat",
        note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
        logID: "tes",
        logName: "tes",
      },
    ],
  };
</script>

<LayoutWithNav>
  <div class="p-10 mx-40">
    <Heading2>Create a Log</Heading2>
    <Label styleClass="text-lg pt-10 pb-5 flex gap-3 items-center">
      <div
        class="w-5 h-5 rounded-full bg-primary p-3 text-sm text-white flex items-center justify-center"
      >
        1
      </div>
      Surgery Details</Label
    >
    <div class="flex flex-col gap-5">
      <TextInput
        label="Surgery Name"
        placeholderText="Heart Surgery"
        bind:value={data.surgeryName}
      />
      <div class="flex gap-3 flex-wrap">
        <ListInput
          bind:value={data.surgeryOrg}
          label="Organization"
          options={["Org 1", "Org 2"]}
          styleClass="flex-1"
        />
        <DateInput
          bind:date={data.surgeryDate}
          label="Date"
          styleClass="flex-1"
        />
        <ListInput
          bind:value={data.surgeryVisibility}
          label="Visibility"
          styleClass="flex-1"
          options={["Private", "Public"]}
        />
      </div>
    </div>
    <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center"
      ><div
        class="w-5 h-5 rounded-full bg-primary p-3 text-sm text-white flex items-center justify-center"
      >
        2
      </div>
      Surgery Team Details</Label
    >
    <SurgeryTeamTable bind:data={data.surgeryTeam} />
    <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
      <div
        class="w-5 h-5 rounded-full bg-primary p-3 text-sm text-white flex items-center justify-center"
      >
        3
      </div>
      Surgery Video Details</Label
    >
    <FileInput
      label=""
      bind:file={surgeryVideoFile}
      actionText="Upload Surgery Video"
    />
    <FileInput
      label=""
      bind:file={surgeryThumbnailFile}
      actionText="Upload Thumbnail"
    />

    <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center "
      ><div
        class="w-5 h-5 rounded-full bg-primary p-3 text-sm text-white flex items-center justify-center"
      >
        4
      </div>
      Notes Details</Label
    >
    <NotesDetailsTable label="Previous Notes" bind:data={data.surgeryNotes} />

    <TextArea
      label="Your Note"
      placeholderText="Enter note here"
      styleClass={"py-10"}
      bind:value={surgeryNote}
    />

    <Button buttonText="Create Log" styleClass="my-2" />
  </div>
</LayoutWithNav>

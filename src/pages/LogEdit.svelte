<script>
  import { push } from "svelte-spa-router";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";

  import left from "../assets/icons/left.png";
  import Label from "../components/design/titles/Label.svelte";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import ListInput from "../components/design/inputs/ListInput.svelte";
  import DateInput from "../components/design/inputs/DateInput.svelte";
  import ListTextInput from "../components/design/inputs/ListTextInput.svelte";
  import SurgeryTeamTable from "../components/design/tables/SurgeryTeamTable.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import NotesDetailsTable from "../components/design/tables/NotesDetailsTable.svelte";
  import TextArea from "../components/design/inputs/TextArea.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import { store } from "../stores/store";
  let BASEURL = import.meta.env.VITE_BASEURL;

  onMount(async () => {
    await dataload();
  });
  // async function dataload() {
  //     let response = await axios.get(
  //     BASEURL + "/surgery/?id=" + params.id,
  //     {
  //         headers: {
  //         token: $store.jwt,
  //         },
  //     }
  //     );
  // }

  export let params = {};
  let newNote = "";
  let surgeryData = {
    logID: "",
    surgeryName: "",
    surgeryOrg: "",
    surgeryDate: "",
    surgeryVisibility: "",
    privateList: [],
    surgeryTeam: [
      {
        memberUsername: "",
        memberRole: "",
        memberStatus: "",
      },
    ],
    notes: [
      {
        doctorName: "Yajat",
        doctorId: "yajat",
        note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
      },
    ],
  };
  let patientData = {
    patientID: "",
    patientGender: "",
    patientAge: "",
  };
  // get all orgs from backend
  let isPatientIDAvailable = false;
</script>

<LayoutWithLogNav {params}>
  <div class="">
    <div
      class="p-10 flex flex-col border-b-2 md:flex-row justify-between items-center"
    >
      <LinkIconButton
        buttonText={"Go back to browse"}
        onClick={() => {
          push("/browse");
        }}
        img={left}
      />
    </div>

    <div class="flex flex-col gap-5 p-10 pb-4">
      <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
        Surgery Details</Label
      >
      <TextInput
        label="Surgery Name"
        placeholderText="Heart Surgery"
        bind:value={surgeryData.surgeryName}
      />
      <div class="flex gap-3 flex-wrap">
        <ListInput
          bind:value={surgeryData.surgeryOrg}
          label="Organization"
          options={["Org 1", "Org 2"]}
          styleClass="flex-1"
        />
        <DateInput
          bind:date={surgeryData.surgeryDate}
          label="Date"
          styleClass="flex-1"
        />
        <ListInput
          bind:value={surgeryData.surgeryVisibility}
          label="Visibility"
          styleClass="flex-1"
          options={["Private", "Public"]}
        />
      </div>
    </div>
    <div class="flex px-10">
      <ListTextInput
        label="Private List"
        actionText="Add Username"
        bind:items={surgeryData.privateList}
      />
    </div>
    <div class="flex flex-col px-10 py-4">
      <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
        Surgery Team Details</Label
      >
      <Label styleClass="py-4 text-primary">Surgery Team</Label>
      <SurgeryTeamTable data={surgeryData.surgeryTeam} />

      <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
        Notes</Label
      >
      <NotesDetailsTable bind:data={surgeryData.notes} editable={true} />
      <TextArea
        label="Add a note"
        placeholderText="Add a note"
        styleClass="mt-10"
        bind:value={newNote}
      />

      <Button
        buttonText="Edit logs"
        styleClass="mt-10"
        onClick={() => {
          // check
          surgeryData = {
            ...surgeryData,
            notes: [
              ...surgeryData.notes,
              {
                doctorName: "Yajat",
                doctorId: "yajat",
                note: newNote,
              },
            ],
          };

          // server call
        }}
      />

      <div class="divider py-7" />
      <Label styleClass="text-lg  pb-5 flex gap-3 items-center">
        Patient Details</Label
      >
      <div class="flex gap-2 items-center py-5 flex-wrap">
        <div>New</div>
        <input
          type="checkbox"
          bind:checked={isPatientIDAvailable}
          class="toggle"
        />
        <div>Existing</div>
      </div>
      <div class="mb-24">
        {#if isPatientIDAvailable}
          <TextInput
            label="Patient ID"
            placeholderText="Patient ID (if present)"
          />
        {:else}
          <div class="flex gap-3 w-full items-center flex-wrap">
            <TextInput
              bind:value={patientData.patientID}
              label="Patient Age"
              placeholderText="Number only (eg. 77)"
              styleClass="flex-1"
            />
            <ListInput
              bind:value={patientData.patientGender}
              label="Patient Gender"
              options={["Male", "Female", "Transgenda"]}
              styleClass="flex-1"
            />
            <TextInput
              bind:value={patientData.patientAge}
              label="Patient ID"
              placeholderText="Number only (eg. 77)"
              styleClass="flex-1"
            />
          </div>
        {/if}
        <Button
          buttonText="Add Patient"
          styleClass="mt-10"
          onClick={() => {
            // server call
          }}
        />
      </div>
    </div>
  </div>
</LayoutWithLogNav>

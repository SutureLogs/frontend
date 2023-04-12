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

  export let params = {};
  let newNote = "";
  let data = {
    logID: "",
    surgeryName: "",
    surgeryOrg: "",
    surgeryDate: "",
    surgeryVisibility: "",
    privateList: [],
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
    <div class="flex px-10">
      <ListTextInput
        label="Private List"
        actionText="Add Username"
        bind:items={data.privateList}
      />
    </div>
    <div class="flex flex-col px-10 py-4">
      <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
        Surgery Team Details</Label
      >
      <Label styleClass="py-4 text-primary">Surgery Team</Label>
      <SurgeryTeamTable />

      <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
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
      {#if isPatientIDAvailable}
        <TextInput
          label="Patient ID"
          placeholderText="Patient ID (if present)"
        />
      {:else}
        <div class="flex gap-3 w-full items-center flex-wrap">
          <TextInput
            label="Patient Age"
            placeholderText="Number only (eg. 77)"
            styleClass="flex-1"
          />

          <ListInput
            label="Patient Gender"
            options={["Male", "Female", "Transgenda"]}
            styleClass="flex-1"
          />
          <TextInput
            isDisabled={true}
            label="Generated Patient ID"
            placeholderText="Number only (eg. 77)"
            styleClass="flex-1"
          />
        </div>
      {/if}
      <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
        Notes</Label
      >
      <NotesDetailsTable data={data.notes} editable={true} />
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
          data = {
            ...data,
            notes: [
              ...data.notes,
              {
                surgeonName: "Yajat",
                userID: "yajat",
                note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
              },
            ],
          };

          // server call
        }}
      />
    </div>
  </div>
</LayoutWithLogNav>

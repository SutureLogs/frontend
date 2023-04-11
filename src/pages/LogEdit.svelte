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

  export let params = {};

  let data = {
    logID: "",
    surgeryName: "",
    surgeryOrg: "",
    surgeryDate: "",
    surgeryVisibility: "",
    privateList: [],
  };
  // get all orgs from backend
  let isPatientIDAvailable = false;
</script>

<LayoutWithLogNav {params}>
  <div class="grid grid-cols-3 h-full">
    <div class="col-span-2 border-r-2 h-full">
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
        <Label styleClass="py-4 text-primary">Surgery Team</Label>
        <SurgeryTeamTable />
        {#if isPatientIDAvailable}
          <TextInput
            label="Patient ID"
            placeholderText="Patient ID (if present)"
          />
        {:else}
          <div class="flex gap-3">
            <TextInput
              label="Patient Age"
              placeholderText="Number only (eg. 77)"
            />
            <ListInput
              label="Patient Gender"
              options={["Male", "Female", "Transgenda"]}
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
</LayoutWithLogNav>

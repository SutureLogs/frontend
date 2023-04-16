<script>
  // @ts-nocheck

  import { push } from "svelte-spa-router";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";

  import left from "../assets/icons/left.png";
  import Label from "../components/design/titles/Label.svelte";
  import noentry from "../assets/icons/noentry.png";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import ListInput from "../components/design/inputs/ListInput.svelte";
  import DateInput from "../components/design/inputs/DateInput.svelte";
  import ListTextInput from "../components/design/inputs/ListTextInput.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import NotesDetailsTable from "../components/design/tables/NotesDetailsTable.svelte";
  import TextArea from "../components/design/inputs/TextArea.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import { store } from "../stores/store";
  import Loading from "../components/Loading.svelte";
  import { toast } from "svelte-french-toast";
  import moment from "moment";
  import SurgeryTeamTableForEdit from "../components/design/tables/SurgeryTeamTableForEdit.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";

  let BASEURL = import.meta.env.VITE_BASEURL;

  onMount(async () => {
    await dataload();
  });
  let unauthorized = false;
  async function dataload() {
    loading = true;
    let response = await axios.get(
      BASEURL + "/surgery/editpage-data?id=" + params.id,
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    if (response.data.message === "Unauthorized") {
      unauthorized = true;
      loading = false;
      return;
    }
    loading = false;
    surgeryData = {
      surgeryName: response.data.surgery.surgeryName,
      surgeryOrg: response.data.surgery.surgeryOrg,
      availableOrgs: response.data.surgery.availableOrgs,
      surgeryTeam: response.data.surgery.surgeryTeam,
      surgeryDate: moment(response.data.surgery.surgeryDate).format(
        "YYYY-MM-DD"
      ),
      surgeryVisibility: response.data.surgery.surgeryVisibility,
      privateList: response.data.surgery.privateList,
      notes: response.data.surgery.notes,
    };

    patientData = {
      patientAge: response.data.surgery.patientAge,
      patientGender: response.data.surgery.patientGender,
      patientID: response.data.surgery.patientId,
    };
  }
  let loading = false;
  export let params = {};
  let newNote = "";
  let surgeryData = {
    surgeryName: "",
    surgeryOrg: "",
    availableOrgs: [],
    surgeryDate: "",
    surgeryVisibility: "",
    privateList: [],
    surgeryTeam: [],
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
  {#if loading}
    <Loading />
  {:else if unauthorized === true}
    <div
      class="flex justify-center flex-col items-center h-full max-w-xs mx-auto"
    >
      <img src={noentry} alt="" />
      <div class="text-center">
        You do not have access to this page. Please contact someone from the
        surgical team to give you access.
      </div>
    </div>
  {:else}
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
        <Heading2 styleClass="text-lg py-0 flex gap-3 items-center">
          Edit this surgery log</Heading2
        >

        <Label styleClass="text-lg pt-5 pb-5 flex gap-3 items-center">
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
            options={surgeryData.availableOrgs}
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
        {#if surgeryData.surgeryVisibility == "Private"}
          <ListTextInput
            label="Private List"
            actionText="Add Username"
            bind:items={surgeryData.privateList}
          />
        {/if}
      </div>
      <div class="flex flex-col px-10 py-4">
        <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
          Surgery Team Details</Label
        >
        <Label styleClass="py-4 text-primary">Surgery Team</Label>
        <SurgeryTeamTableForEdit bind:data={surgeryData.surgeryTeam} />

        <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center">
          Notes Details</Label
        >
        <NotesDetailsTable bind:data={surgeryData.notes} editable={true} />
        <TextArea
          label="Add a new note"
          placeholderText="Use this space to add a note about the surgery or patient development that you want to share with other doctors. Eg. Patient is allergic to penicillin. or Eg. Use of a specific drug is contraindicated in this patient."
          styleClass="mt-10"
          bind:value={newNote}
        />

        <Button
          buttonText="Edit logs"
          styleClass="mt-10"
          onClick={async () => {
            let surgeryData1 = {
              ...surgeryData,
              logId: params.id,

              newNote: {
                doctorName: $store.doctorName,
                doctorId: $store.doctorID,
                note: newNote,
              },
            };
            const response = await axios.post(
              BASEURL + "/surgery/edit-surgery",
              { surgeryData: surgeryData1 },

              {
                headers: {
                  token: $store.jwt,
                },
              }
            );
            if (response.data.status === "success") {
              toast.success("Surgery edited successfully");
            } else {
              toast.error("Surgery edit failed");
            }
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
              bind:value={patientData.patientID}
              label="Patient ID"
              placeholderText="Patient ID (if present)"
            />
          {:else}
            <div class="flex gap-3 w-full items-center flex-wrap">
              <TextInput
                bind:value={patientData.patientAge}
                label="Patient Age"
                placeholderText="Number only (eg. 77)"
                styleClass="flex-1"
              />
              <ListInput
                bind:value={patientData.patientGender}
                label="Patient Gender"
                options={["Male", "Female"]}
                styleClass="flex-1"
              />
              <TextInput
                bind:value={patientData.patientID}
                label="Patient ID"
                placeholderText="Number only (eg. 77)"
                styleClass="flex-1"
              />
            </div>
          {/if}
          <div class="my-3">*Can be edited only once.</div>

          <Button
            buttonText="Edit Patient"
            styleClass="mt-10"
            onClick={async () => {
              // server call
              if (isPatientIDAvailable) {
                const existResponse = await axios.get(
                  BASEURL +
                    "/patient/check-patient-exists?patientId=" +
                    patientData.patientID,
                  {
                    headers: {
                      token: $store.jwt,
                    },
                  }
                );
                if (!existResponse.data.patientExists)
                  return toast.error("Patient does not exist");
                else {
                  const response = await axios.post(
                    BASEURL + "/patient/add-surgery",
                    {
                      patientId: patientData.patientID,
                      surgeryId: params.id,
                    },
                    {
                      headers: {
                        token: $store.jwt,
                      },
                    }
                  );
                  if (response.data.status === "success")
                    toast.success("Updated Patient");
                  else toast.error("Error updating patient");
                }
              } else {
                const response = await axios.post(
                  BASEURL + "/patient/create-patient",
                  {
                    patientId: patientData.patientID,
                    patientAge: patientData.patientAge,
                    patientGender: patientData.patientGender,
                    logId: params.id,
                  },
                  {
                    headers: {
                      token: $store.jwt,
                    },
                  }
                );
                if (response.data.status === "success")
                  toast.success("Added Patient");
                else toast.error("Error adding patient");
              }
            }}
          />
        </div>
      </div>
    </div>
  {/if}
</LayoutWithLogNav>

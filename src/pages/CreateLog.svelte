<script>
  import { onMount } from "svelte";

  // @ts-nocheck

  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import DateInput from "../components/design/inputs/DateInput.svelte";
  import FileInput from "../components/design/inputs/FileInput.svelte";
  import ListInput from "../components/design/inputs/ListInput.svelte";
  import TextArea from "../components/design/inputs/TextArea.svelte";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import SurgeryTeamTable from "../components/design/tables/SurgeryTeamTable.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import axios from "axios";
  import { store } from "../stores/store";
  import { toast } from "svelte-french-toast";
  import { push } from "svelte-spa-router";

  let surgeryVideoFile = null;
  let surgeryThumbnailFile = null;
  let vitalsFile = null;
  let BASEURL = import.meta.env.VITE_BASEURL;
  let loading = false;

  onMount(async () => {
    loading = true;
    const response = await axios.get(BASEURL + "/doctor/getorgs", {
      headers: {
        token: $store.jwt,
      },
    });
    if (response.data.status === "success") {
      data.availsurgeryOrg = response.data.organisations;
      data.surgeryTeam.push({
        memberUsername: $store.username,
        memberRole: "Lead Surgeon",
        memberStatus: "Accepted",
      });
      loading = false;
    } else {
      toast.error("Something went wrong");
    }
  });

  let data = {
    surgeryName: "",
    surgeryDate: "",
    surgeryOrg: "",
    availsurgeryOrg: [],
    surgeryVisibility: "",
    surgeryTeam: [],
    surgeryNote: "",
  };

  async function submit() {
    loading = true;
    let fd = new FormData();
    fd.append("operationVideo", surgeryVideoFile[0]);
    fd.append("vital", vitalsFile[0]);
    fd.append("thumbnail", surgeryThumbnailFile[0]);
    fd.append("surgeryName", data.surgeryName);
    fd.append("surgeryDate", data.surgeryDate);
    fd.append("surgeryOrg", data.surgeryOrg);
    fd.append("surgeryVisibility", data.surgeryVisibility);
    fd.append("surgeryNote", data.surgeryNote);
    fd.append("surgeryTeam", JSON.stringify(data.surgeryTeam));

    const response = await axios.post(BASEURL + "/surgery/create-surgery", fd, {
      headers: {
        token: $store.jwt,
      },
    });
    loading = false;
    if (response.data.status === "success") {
      toast.success("Surgery Log Created");
      push("/base/" + response.data.surgeryLog._id);
    } else {
      toast.error("Something went wrong");
    }
  }
</script>

<LayoutWithNav bind:loading>
  <div class="p-10 md:mx-40">
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
          options={data.availsurgeryOrg}
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
      label="Upload Surgery Video*"
      bind:file={surgeryVideoFile}
      actionText="Video of Surgery only (mp4)"
    />
    <FileInput
      label="Upload Thumbnail*"
      bind:file={surgeryThumbnailFile}
      actionText="Thumbnail of Surgery (jpg,png,jpeg,webp)"
    />
    <FileInput
      label="Upload Vitals File*"
      bind:file={vitalsFile}
      actionText="Vitals File (csv)"
    />
    <div class="label-text-alt mt-5">
      Video files must contain the "vitalStartTime" metadata tag <a
        class="text-primary"
        href="https://gist.github.com/yajatvishwak/b5e8f904dd3e9a72687f39fa3e7c0090"
        >Refer here.</a
      >
    </div>

    <Label styleClass="text-lg pt-14 pb-5 flex gap-3 items-center "
      ><div
        class="w-5 h-5 rounded-full bg-primary p-3 text-sm text-white flex items-center justify-center"
      >
        4
      </div>
      Notes Details</Label
    >

    <TextArea
      label="Your Note"
      placeholderText="Enter note here"
      styleClass={"py-2"}
      bind:value={data.surgeryNote}
    />

    <Button buttonText="Create Log" styleClass="my-2" onClick={submit} />
  </div>
</LayoutWithNav>

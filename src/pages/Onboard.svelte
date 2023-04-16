<script>
  // @ts-nocheck

  import Layout from "../components/Layout.svelte";
  import logo from "../assets/logoblack.png";
  import Paragraph from "../components/design/titles/Paragraph.svelte";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import ListTextInput from "../components/design/inputs/ListTextInput.svelte";
  import FileInput from "../components/design/inputs/FileInput.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import { toast } from "svelte-french-toast";
  import { store } from "../stores/store";
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import Loading from "../components/Loading.svelte";

  let BASEURL = import.meta.env.VITE_BASEURL;
  let profilepicfiles;
  let verificationfiles;
  let fullname = "";
  let qualification = "";
  let organizations = [];
  let loading = false;

  $: {
    console.log(organizations);
  }
  async function submit() {
    loading = true;
    const fd = new FormData();
    if (profilepicfiles.length === 0) {
      toast.error("Please upload a profile picture");
      loading = false;
      return;
    }
    if (verificationfiles.length === 0) {
      toast.error("Please upload a verification document (.pdf)");
      loading = false;
      return;
    }
    if (fullname === "") {
      toast.error("Please enter your full name");
      loading = false;
      return;
    }
    if (qualification === "") {
      toast.error("Please enter your qualification");
      loading = false;
      return;
    }
    if (organizations.length === 0) {
      toast.error("Please enter your organization");
      loading = false;
      return;
    }

    fd.append("profilePicture", profilepicfiles[0]);
    fd.append("verificationDocument", verificationfiles[0]);

    fd.append("name", fullname);
    fd.append("qualification", qualification);
    fd.append("organisation", JSON.stringify(organizations));

    const res = await axios.post(BASEURL + "/auth/onboard", fd, {
      headers: {
        token: $store.jwt,
      },
    });
    loading = false;
    if (res.data.status === "success") {
      toast.success("Onboarded successfully");
      $store.doctorName = fullname;
      push("/browse");
    } else {
      toast.error(res.data.message);
    }
  }
</script>

<Layout>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center flex-wrap p-10">
      <div class="flex gap-2 items-center">
        <img src={logo} class="w-10 object-contain" alt="" />
        <div class="font-black text-2xl">
          Suture<span class="text-primary">Logs</span>
        </div>
      </div>
      <Paragraph>Hello, there</Paragraph>
    </div>
    <div class="flex justify-center items-center">
      <div class="p-5 m-3 rounded-xl flex flex-col max-w-4xl w-full">
        <Heading2 styleClass="font-bold"
          >Welcome to Suture<span class="text-primary">Logs</span></Heading2
        >
        <Paragraph styleClass=" opacity-50 pt-1">
          We need a little more information to get you started.
        </Paragraph>
        <div class="flex flex-col gap-3 mt-2">
          <TextInput
            placeholderText="John Doe"
            bind:value={fullname}
            label="Full Name"
          />
          <TextInput
            placeholderText="John Doe"
            bind:value={qualification}
            label="Qualification"
          />
          <ListTextInput label="Organization" bind:items={organizations} />
          <FileInput
            bind:file={profilepicfiles}
            label="Profile Picture"
            actionText="Upload Profile Picture (.jpg, .jpeg, .png)"
          />
          <FileInput
            label="Verification"
            actionText="Upload ID/Verification (.pdf only)"
            bind:file={verificationfiles}
          />
          {#if loading}
            <div class="w-full">
              <Loading />
            </div>
          {:else}
            <Button buttonText="Continue" onClick={submit} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</Layout>

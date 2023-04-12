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

  let BASEURL = import.meta.env.VITE_BASEURL;
  let profilepicfiles;
  let verificationfiles;
  let fullname = "";
  let qualification = "";
  let organizations = [];
  $: {
    console.log(organizations);
  }

  async function submit() {
    const fd = new FormData();
    fd.append("profilePicture", profilepicfiles[0]);
    fd.append("verificationDocument", verificationfiles[0]);

    fd.append("name", fullname);
    fd.append("qualification", qualification);
    fd.append("organisation", organizations);

    const res = await axios.post(BASEURL + "/auth/onboard", fd, {
      headers: {
        token: $store.jwt,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      toast.success("Onboarded successfully");
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
            actionText="Upload Profile Picture"
          />
          <FileInput
            label="Verification"
            actionText="Upload ID/Verification"
            bind:file={verificationfiles}
          />
          <Button buttonText="Continue" onClick={submit} />
        </div>
      </div>
    </div>
  </div>
</Layout>

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
      <Paragraph>Hello, Username</Paragraph>
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
          <TextInput placeholderText="John Doe" label="Full Name" />
          <TextInput placeholderText="John Doe" label="Qualification" />
          <ListTextInput label="Organization" />
          <FileInput
            label="Profile Picture"
            actionText="Upload Profile Picture"
          />
          <FileInput label="Verification" actionText="Upload ID/Verification" />
          <Button buttonText="Continue" />
        </div>
      </div>
    </div>
  </div>
</Layout>

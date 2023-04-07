<script>
  import Layout from "../components/Layout.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import LinkButton from "../components/design/buttons/LinkButton.svelte";
  import PasswordInput from "../components/design/inputs/PasswordInput.svelte";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import Heading from "../components/design/titles/Heading.svelte";
  import Subheading from "../components/design/titles/Subheading.svelte";
  import logo from "../assets/logoblack.png";
  import docs from "../assets/auth.png";
  let mode = "login";
</script>

<Layout>
  <div class="grid lg:grid-cols-2 w-full">
    <div class="m-10 p-10 flex flex-col rounded-xl bg-slate-100">
      <div class="flex gap-2">
        <img src={logo} class="w-10 object-contain" alt="" />
        <div class="font-black text-2xl">
          Suture<span class="text-primary">Logs</span>
        </div>
      </div>
      <div class="flex justify-center flex-col gap-7 mt-10 items-center h-full">
        <img src={docs} class=" w-32 md:w-44 lg:w-52" alt="" />
        <div class="flex-col md:mx-32 lg:mx-52 text-center">
          <Heading>Collaborate, Learn, and Enhance Your Surgical Skills</Heading
          >
          <Subheading styleClass="pt-3"
            >SutureLogs is a platform that allows you to track your surgeries
            and learn from other surgeons.</Subheading
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center m-10">
      <div>
        <Heading>Get Started</Heading>
        {#if mode === "login"}
          <Subheading styleClass="pt-3"
            >Login to your SutureLogs account</Subheading
          >
        {:else}
          <Subheading styleClass="pt-3">Create a SutureLogs account</Subheading>
        {/if}
      </div>
      {#if mode === "login"}
        <div class="flex gap-3 mt-10 flex-col">
          <TextInput placeholderText="Johndoe..." label="Username" />
          <PasswordInput placeholderText="******" label="Password" />
          <div class="py-4 w-full"><Button buttonText="Sign in " /></div>
          <LinkButton
            styleClass="mb-5"
            onClick={() => (mode = "signup")}
            buttonText="New here?"
          />
        </div>
      {:else}
        <div class="flex gap-3 mt-10 flex-col">
          <TextInput placeholderText="Johndoe..." label="Username" />
          <PasswordInput placeholderText="******" label="Password" />
          <PasswordInput placeholderText="******" label="Confirm Password" />
          <div class="py-4 w-full"><Button buttonText="Sign up" /></div>

          <LinkButton
            styleClass="mb-5"
            onClick={() => (mode = "login")}
            buttonText="Already have an account?"
          />
        </div>
      {/if}
    </div>
  </div>
</Layout>

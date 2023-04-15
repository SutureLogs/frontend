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
  import axios from "axios";
  import toast from "svelte-french-toast";
  import { store } from "../stores/store";
  import { push } from "svelte-spa-router";
  let BASEURL = import.meta.env.VITE_BASEURL;

  let username = "";
  let password = "";
  let retypedPassword = "";

  let mode = "login";

  let loading = false;

  const signup = async () => {
    if (username === "" || password === "" || retypedPassword === "") {
      toast.error("Please fill in all the fields");
      return;
    }
    if (password !== retypedPassword) {
      toast.error("Passwords do not match");
      return;
    }
    loading = true;
    const response = await axios.post(BASEURL + "/auth/signup", {
      username: username,
      password: password,
    });
    loading = false;
    if (response.data.status === "success") {
      console.log(response.data);
      $store.jwt = response.data.token;
      $store.username = username;
      $store.doctorID = response.data.id;
      push("/onboard");
    } else {
      toast.error(response.data.message);
    }
    // username = "";
    // password = "";
    // retypedPassword = "";
  };

  const login = async () => {
    if (username === "" || password === "") {
      toast.error("Please fill in all the fields");
      return;
    }
    loading = true;
    const response = await axios.post(BASEURL + "/auth/login", {
      username: username,
      password: password,
    });
    loading = false;
    if (response.data.status === "success") {
      $store.jwt = response.data.token;
      $store.username = username;
      $store.doctorName = response.data.name;
      $store.doctorID = response.data.id;

      push("/browse");
    } else {
      toast.error(response.data.message);
    }
    // username = "";
    // password = "";
    // retypedPassword = "";
  };
</script>

<Layout>
  <div class="grid lg:grid-cols-2 w-full">
    <div class="m-10 flex flex-col rounded-xl bg-slate-100">
      <div class="flex gap-2 p-10">
        <img src={logo} class="w-10 object-contain" alt="" />
        <div class="font-black text-2xl">
          Suture<span class="text-primary">Logs</span>
        </div>
      </div>
      <div class="flex justify-center flex-col gap-7 my-2 items-center h-full">
        <img src={docs} class=" w-32 md:w-44 lg:w-52" alt="" />
        <div class="flex-col text-center mx-10 pb-5 md:mx-20 lg:mx-44">
          <div class="font-bold text-2xl">
            Collaborate, Learn, and Enhance Your Surgical Skills
          </div>
          <div class="pt-3">
            SutureLogs is a platform that allows you to track your surgeries and
            learn from other surgeons.
          </div>
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
          <TextInput
            placeholderText="Johndoe..."
            bind:value={username}
            label="Username"
          />
          <PasswordInput
            placeholderText="******"
            bind:value={password}
            label="Password"
          />
          <div class="py-4 w-full">
            {#if loading}
              <Button buttonText="Signing in..." />
            {:else}
              <Button buttonText="Sign in" onClick={() => login()} />
            {/if}
          </div>
          <LinkButton
            styleClass="mb-5"
            onClick={() => (mode = "signup")}
            buttonText="New here?"
          />
        </div>
      {:else}
        <div class="flex gap-3 mt-10 flex-col">
          <TextInput
            bind:value={username}
            placeholderText="Johndoe..."
            label="Username"
          />
          <PasswordInput
            bind:value={password}
            placeholderText="******"
            label="Password"
          />
          <PasswordInput
            bind:value={retypedPassword}
            placeholderText="******"
            label="Confirm Password"
          />
          <div class="py-4 w-full">
            {#if loading}
              <Button buttonText="Signing up..." />
            {:else}
              <Button buttonText="Sign up" onClick={() => signup()} />
            {/if}
          </div>

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

<script>
  import toast from "svelte-french-toast";
  import LayoutWithAdminNav from "../components/LayoutWithAdminNav.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import PasswordInput from "../components/design/inputs/PasswordInput.svelte";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import { store } from "../stores/store";
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  let BASEURL = import.meta.env.VITE_BASEURL;

  onMount(async () => {
    let res = await axios.get(BASEURL + "/admin/getOrganisation", {
      headers: {
        token: $store.jwt,
      },
    });
    updateObj.orgName = res.data.organisation;
  });

  let updateObj = {
    orgName: "",
    password: "",
    newPassword: "",
    newPasswordAgain: "",
  };
  let loading = false;
  async function updateDetails() {
    if (updateObj.newPassword !== updateObj.newPasswordAgain) {
      toast.error("Passwords do not match");
      return;
    }
    loading = true;
    const response = await axios.post(
      BASEURL + "/admin/update-admin-details",
      {
        username: $store.username,
        orgName: updateObj.orgName,
        newPassword: updateObj.newPassword,
      },
      { headers: { token: $store.jwt } }
    );
    loading = false;
    if (response.data.status === "success") {
      toast.success("Details updated successfully");
    } else {
      toast.error("Something went wrong");
    }
  }
</script>

<LayoutWithAdminNav>
  <div class="p-10">
    <Heading2>Administrator Profile</Heading2>
    <div class="flex flex-col mx-auto w-full max-w-screen-md mt-10">
      <div>Logged in as {$store.username}</div>
      <div class="divider">Settings</div>
      <form
        on:submit|preventDefault={updateDetails}
        class="flex flex-col gap-2"
      >
        <TextInput label="Organisation" bind:value={updateObj.orgName} />
        <!-- <PasswordInput placeholderText="Current Password" label="Password" /> -->
        <PasswordInput
          placeholderText="New Password"
          label="Password"
          bind:value={updateObj.newPassword}
        />
        <PasswordInput
          placeholderText="New Password Again"
          label=""
          bind:value={updateObj.newPasswordAgain}
        />
        <div class="my-2" />
        {#if loading}
          <button
            class={`btn m-0 bg-[#4669C1] border-0 w-full text-white btn-disabled `}
          >
            Loading...
          </button>
        {:else}
          <button
            class={`btn m-0 bg-[#4669C1] border-0 w-full text-white `}
            type="submit"
          >
            Make Changes
          </button>
        {/if}
      </form>
      <div class="divider my-10">Actions</div>
      <Button
        styleClass="bg-red-500"
        buttonText="Logout"
        onClick={() => {
          localStorage.clear();
          localStorage.clear();
          $store.jwt = null;
          $store.doctorID = null;
          $store.doctorName = null;
          $store.username = null;
          push("/auth");
        }}
      />
    </div>
  </div>
</LayoutWithAdminNav>

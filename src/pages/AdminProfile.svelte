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

  let BASEURL = import.meta.env.VITE_BASEURL;

  let updateObj = {
    orgName: "",
    password: "",
    newPassword: "",
    newPasswordAgain: "",
  };
  let loading = false;
  async function updateDetails() {
    if (
      updateObj.orgName === "" ||
      updateObj.password === "" ||
      updateObj.newPassword === "" ||
      updateObj.newPasswordAgain === ""
    ) {
      toast.error("Please fill in all the fields");
      return;
    }
    if (updateObj.newPassword !== updateObj.newPasswordAgain) {
      toast.error("Passwords do not match");
      return;
    }
    loading = true;
    const response = await axios.post(BASEURL + "/admin/update-admin-details", {
      username: $store.username,
      orgName: updateObj.orgName,
      password: updateObj.password,
      newPassword: updateObj.newPassword,
    });
    loading = false;
    if (response.data.status === "success") {
      toast.success("Details updated successfully");
    } else {
      toast.error(response.data.message);
    }
  }
</script>

<LayoutWithAdminNav>
  <div class="p-10">
    <Heading2>Administrator Profile</Heading2>
    <div class="flex flex-col mx-auto w-full max-w-screen-md mt-10">
      <div>Logged in as {$store.username}</div>
      <div class="divider">Settings</div>
      <form on:submit={updateDetails} class="flex flex-col gap-2">
        <TextInput label="Organisation" />
        <PasswordInput placeholderText="Current Password" label="Password" />
        <PasswordInput placeholderText="New Password" label="" />
        <PasswordInput placeholderText="New Password Again" label="" />
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
          push("/auth");
        }}
      />
    </div>
  </div>
</LayoutWithAdminNav>

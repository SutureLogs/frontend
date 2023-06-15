<script>
  import { onMount } from "svelte";
  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import PortfolioCard from "../components/design/cards/PortfolioCard.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import Paragraph from "../components/design/titles/Paragraph.svelte";
  import { store } from "../stores/store";
  import axios from "axios";
  import Loading from "../components/Loading.svelte";
  import nosurgery from "../assets/icons/nosurgery.png";
  import { push } from "svelte-spa-router";
  import TextInput from "../components/design/inputs/TextInput.svelte";
  import FileInput from "../components/design/inputs/FileInput.svelte";
  import Button from "../components/design/buttons/Button.svelte";
  import toast from "svelte-french-toast";
  import PasswordInput from "../components/design/inputs/PasswordInput.svelte";
  let BASEURL = import.meta.env.VITE_BASEURL;
  let isSettingModalOpen = false;
  let data = {
    doctorFullName: "John Doe",
    doctorQualification: "MBBS, MD",
    doctorOrganisation: "Organisation Name",
    doctorImg: "https://via.placeholder.com/123",
    surgeries: [
      {
        surgeryName: "surgeryName",
        img: "img",
        logID: "logID",
      },
    ],
  };
  let newDP = null;
  let newPassword = "";
  export let params = {};
  onMount(async () => {
    await dataload();
  });
  let loading = false;
  async function dataload() {
    loading = true;
    if (params.id) {
      let response = await axios.get(
        BASEURL + "/doctor/profile?id=" + params.id,
        {
          headers: {
            token: $store.jwt,
          },
        }
      );
      data = response.data.doctor;
    } else {
      let response = await axios.get(
        BASEURL + "/doctor/profile?id=" + $store.doctorID,
        {
          headers: {
            token: $store.jwt,
          },
        }
      );
      data = response.data.doctor;
    }

    loading = false;
  }

  async function updateDoctor() {
    loading = true;
    let fd = new FormData();
    if (newDP) {
      fd.append("profilePicture", newDP[0]);
    }
    if (newPassword !== "") {
      fd.append("password", newPassword);
    }

    fd.append("name", data.doctorFullName);
    fd.append("qualification", data.doctorQualification);

    let response = await axios.post(BASEURL + "/admin/edit-doctor", fd, {
      headers: {
        token: $store.jwt,
      },
    });
    if (response.data.status === "success") {
      toast.success("Profile Updated");
      isSettingModalOpen = false;
      await dataload();
    } else {
      toast.error("Something went wrong");
    }
    loading = false;
  }
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
</script>

<input type="checkbox" checked={isSettingModalOpen} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <button
      on:click={() => (isSettingModalOpen = false)}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >
    <h3 class="text-lg font-bold">Settings</h3>
    <div class="py-4">
      <TextInput
        placeholderText="Name"
        label="Name"
        bind:value={data.doctorFullName}
      />
      <TextInput
        placeholderText="Qualification"
        label="Qualification"
        bind:value={data.doctorQualification}
      />
      <PasswordInput
        placeholderText="Leave blank, if you don't want to change password"
        label="New Password"
        bind:value={newPassword}
      />
      <FileInput label="Profile Image" bind:file={newDP} />
    </div>
    <div class="py-2 flex flex-col gap-2">
      <Button buttonText="Make Changes" onClick={updateDoctor} />
      <button
        on:click={() => {
          localStorage.clear();
          $store.jwt = null;
          $store.doctorID = null;
          $store.doctorName = null;
          $store.username = null;

          push("/auth");
        }}
        class="w-full btn border-0 bg-red-500">Logout</button
      >
    </div>
  </div>
</div>

<LayoutWithNav>
  <div class="p-10 h-full">
    {#if loading}
      <div class="h-screen">
        <Loading />
      </div>
    {:else}
      <div class="flex justify-between items-center max-w-4xl mx-auto">
        <Heading2>Profile</Heading2>
        <div class="flex gap-2">
          {#if $store.doctorID === params.id || params.id === null}
            <button
              on:click={() => (isSettingModalOpen = true)}
              class="btn flex gap-2 bg-primary border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>Settings</div>
            </button>
          {/if}
          <button
            on:click={() =>
              copyToClipboard(
                window.location.hostname +
                  "/#/profile/" +
                  (params.id ?? $store.doctorID)
              )}
            class="btn flex gap-2 btn-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>

            <div>Share Profile</div>
          </button>
        </div>
      </div>
      <div class="flex flex-col h-full items-center mt-10">
        <div class="max-w-4xl w-full">
          <div
            class="flex flex-col md:flex-row items-center justify-between gap-3 border-b-2 border-t-2 py-7"
          >
            <img
              src={data.doctorImg
                ? BASEURL + "/surgery/img/" + data.doctorImg
                : `https://api.dicebear.com/6.x/initials/svg?seed=${data.doctorFullName}`}
              class="rounded-full object-cover w-24 h-24"
              alt=""
            />
            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <Heading2>{data.doctorFullName}</Heading2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <Paragraph>{data.doctorQualification}</Paragraph>
              <Paragraph>@ {data.doctorOrganisation}</Paragraph>
            </div>
            <div class="md:ml-auto md:flex">
              <div class="stats stats-vertical md:stats-horizontal shadow">
                <div class="stat w-full">
                  <div class="stat-title text-sm">Total Surgeries</div>
                  <div class="stat-value text-xl">{data.surgeryCount}</div>
                </div>

                <div class="stat w-full">
                  <div class="stat-title text-sm">Total Likes</div>
                  <div class="stat-value text-xl">{data.totalLikes}</div>
                </div>

                <div class="stat">
                  <div class="stat-title text-sm">Total Views</div>
                  <div class="stat-value text-xl">{data.totalViews}</div>
                </div>
              </div>
            </div>
          </div>
          <Label styleClass="mt-10 text-primary">Surgeries on SutureLogs</Label>
          {#if data.surgeries.length === 0}
            <div
              class="text-center opacity-30 h-full flex flex-col justify-center gap-4 items-center"
            >
              <img src={nosurgery} class="w-20 h-20" alt="" />
              <Paragraph>No surgeries found on SutureLogs</Paragraph>
            </div>
          {/if}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
            {#each data.surgeries as surgery}
              <PortfolioCard
                editable={false}
                surgeryName={surgery.surgeryTitle}
                img={surgery.thumbnailLink}
                logID={surgery._id}
                visibility={surgery.surgeryVisibility}
              />
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</LayoutWithNav>

<script>
  import { push } from "svelte-spa-router";
  import LinkButton from "../buttons/LinkButton.svelte";
  import Label from "../titles/Label.svelte";
  import { store } from "../../../stores/store";
  import axios from "axios";
  import toast from "svelte-french-toast";
  import Loading from "../../Loading.svelte";

  export let logID;
  export let surgeryName;
  export let orgName;

  export let inviteUser = {
    username: "",
    userID: "",
  };
  export let status = "rejected";
  let BASEURL = import.meta.env.VITE_BASEURL;
  let loading = false;
  async function handle(stat) {
    loading = true;
    const response = await axios.post(
      BASEURL + "/doctor/invite-action",
      {
        surgeryId: logID,
        action: stat,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );

    if (response.data.status === "success") {
      toast.success("Invitation " + status + " successfully");
      location.reload();
    } else {
      toast.error("Something went wrong");
    }
  }
</script>

<div class="border-b-2 pb-4">
  <div class="flex gap-3">
    <img
      src="https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg"
      alt=""
      class="w-1/4 object-cover rounded-xl"
    />
    <div class="flex flex-col gap-2">
      <div class="font-bold">
        {surgeryName}
      </div>
      <Label>{orgName}</Label>
    </div>
  </div>
  <div class="mt-3 flex justify-between items-center">
    <Label>invited by <LinkButton buttonText={inviteUser.username} /></Label>
    {#if loading}
      <Loading />
    {:else}
      <div class="flex gap-3 items-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="hover:scale-90 cursor-pointer"
          on:click={() => push("/base/" + logID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path
              fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => handle("accepted")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 {status === 'accepted'
              ? 'text-green-500'
              : 'text-gray-500'}"
          >
            <path
              fill-rule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => handle("rejected")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 {status === 'rejected'
              ? 'text-red-500'
              : 'text-gray-500'}"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    {/if}
  </div>
</div>

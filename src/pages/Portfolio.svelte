<script>
  import axios from "axios";
  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import InvitationCard from "../components/design/cards/InvitationCard.svelte";
  import PortfolioCard from "../components/design/cards/PortfolioCard.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Subheading from "../components/design/titles/Subheading.svelte";
  import { store } from "../stores/store";
  import { onMount } from "svelte";
  import Loading from "../components/Loading.svelte";
  import empty from "../assets/icons/empty.png";

  let BASEURL = import.meta.env.VITE_BASEURL;
  async function dataload() {
    loading = true;
    let response = await axios.get(BASEURL + "/doctor/portfolio", {
      headers: {
        token: $store.jwt,
      },
    });
    data.invites = response.data.invites;
    data.surgeries = response.data.surgeries;
    loading = false;
  }
  let loading = false;
  onMount(async () => {
    await dataload();
  });
  let data = {
    invites: [
      {
        logID: "3",
        surgeryName: "Heart Surgery",
        orgName: "Org 1",
        status: "pending",
        inviteUser: {
          username: "Danny boi",
          userID: "1",
        },
      },
    ],
    surgeries: [
      {
        logID: "1",
        surgeryName: "Heart Surgery",
        surgeryImage:
          "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
      },
    ],
  };
</script>

<LayoutWithNav>
  {#if loading}
    <div class="h-screen">
      <Loading />
    </div>
  {:else}
    <div class="grid md:grid-cols-3 h-full">
      <div class="md:col-span-2 border-r-2 h-full p-10">
        <Heading2>Portfolio</Heading2>
        {#if data.surgeries.length == 0}
          <div
            class="flex flex-col items-center opacity-25 h-full justify-center w-full"
          >
            <img src={empty} alt="empty" class="" />
            <Subheading>You have no surgeries</Subheading>
          </div>
        {:else}
          <div class="grid md:grid-cols-2 gap-6 mt-4">
            {#each data.surgeries as surgery}
              <PortfolioCard
                surgeryName={surgery.surgeryName}
                img={surgery.surgeryImage}
                logID={surgery.logId}
                visibility={surgery.surgeryVisibility}
              />
            {/each}
          </div>
        {/if}
      </div>
      <div class=" border-r-2 h-full p-10 px-5">
        <Heading2>Surgery Team Invites</Heading2>
        <div class="flex flex-col gap-3 mt-5 h-full">
          {#if data.invites.length == 0}
            <div
              class="flex flex-col items-center opacity-25 h-full justify-center"
            >
              <img src={empty} alt="empty" class="" />
              <Subheading>You have no invitations</Subheading>
            </div>
          {/if}
          {#each data.invites as invite}
            <InvitationCard
              surgeryName={invite.surgeryName}
              orgName={invite.orgName}
              status={invite.status}
              inviteUser={invite.inviteUser}
              logID={invite.logId}
            />
          {/each}
        </div>
      </div>
    </div>
  {/if}
</LayoutWithNav>

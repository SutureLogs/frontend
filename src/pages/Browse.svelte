<script>
  // @ts-nocheck

  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import BrowseCard from "../components/design/cards/BrowseCard.svelte";
  import SearchInput from "../components/design/inputs/SearchInput.svelte";
  import compass from "../assets/icons/compass.png";
  import plus from "../assets/icons/plus.png";
  import IconButton from "../components/design/buttons/IconButton.svelte";
  import axios from "axios";
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";
  import { store } from "../stores/store";
  import Loading from "../components/Loading.svelte";
  import { push } from "svelte-spa-router";
  import Label from "../components/design/titles/Label.svelte";
  import PeopleCard from "../components/design/cards/PeopleCard.svelte";
  let BASEURL = import.meta.env.VITE_BASEURL;
  let data = {
    trending: [
      {
        likesCount: 10,
        surgeryName:
          "Hand‑assisted laparoscopic surgery for an esophageal hiatal hernia with incarcerated transverse colon presenting after laparoscopic gastrectomy",
        doctorName: "Dr. John Doe",
        doctorTitle: "General Surgeon",
        doctorImage:
          "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
        surgeryImage:
          "  https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        orgName: "Aster Hospital",
      },
    ],
    discover: [
      {
        likesCount: 10,
        surgeryName:
          "Hand‑assisted laparoscopic surgery for an esophageal hiatal hernia with incarcerated transverse colon presenting after laparoscopic gastrectomy",
        doctorName: "Dr. John Doe",
        doctorTitle: "General Surgeon",
        doctorImage:
          "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
        surgeryImage:
          "  https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        orgName: "Aster Hospital",
      },
    ],
    people: [
      {
        doctorName: "Dr. John Doe",
        doctorDepartment: "General Surgery",
        doctorTitle: "General Surgeon",
        doctorImage:
          "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
      },
    ],
  };
  let loading = false;
  async function dataload() {
    loading = true;
    try {
      const res = await axios.get(BASEURL + "/surgery/browse", {
        headers: {
          token: $store.jwt,
        },
      });
      data.people = res.data.doctors.map((item) => {
        return {
          doctorName: item.name,
          doctorDepartment: item.department.name,
          doctorTitle: item.qualification,
          doctorImage: item.profilePicture,
          doctorId: item._id,
        };
      });

      data.discover = res.data.discover.map((item) => {
        let leadsurgeon = item.surgeryTeam.find(
          (member) => member.role === "Lead Surgeon"
        );
        return {
          surgeryName: item.surgeryTitle,
          doctorName: leadsurgeon.doctorId.name,
          doctorTitle: leadsurgeon.doctorId.qualification,
          doctorImage: leadsurgeon.doctorId.profilePicture,
          surgeryImage: item.thumbnailLink,
          orgName: item.belongsTo.organisation,
          likesCount: item.likesCount,
          videoLink: item.videoLink,
          tags: item.tags,
          logID: item._id,
        };
      });
      data.trending = res.data.trending.map((item) => {
        let leadsurgeon = item.surgeryTeam.find(
          (member) => member.role === "Lead Surgeon"
        );
        return {
          surgeryName: item.surgeryTitle,
          doctorName: leadsurgeon.doctorId.name,
          doctorTitle: leadsurgeon.doctorId.qualification,
          doctorImage: leadsurgeon.doctorId.profilePicture,
          surgeryImage: item.thumbnailLink,
          orgName: item.belongsTo.organisation,
          likesCount: item.likesCount,
          videoLink: item.videoLink,
          tags: item.tags,
          logID: item._id,
        };
      });
      loading = false;
    } catch (err) {
      console.log(err);
      toast.error("Error fetching data");
    }
  }
  onMount(async () => {
    await dataload();
  });
</script>

<LayoutWithNav>
  {#if loading}
    <Loading />
  {:else}
    <div
      class="flex md:justify-between justify-center items-center gap-3 p-5 border-b-2"
    >
      <SearchInput showAI={false} />
      <div class="hidden md:block">
        <IconButton
          icon={plus}
          onClick={() => {
            push("/create");
          }}
        />
      </div>
    </div>

    <div class="p-10">
      <Label styleClass="text-primary pb-5">Trending</Label>
      <div
        class=" gap-12 md:gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {#each data.trending as item}
          <BrowseCard {...item} />
        {/each}
      </div>
    </div>
    <div class="p-10">
      <Label styleClass="text-primary pb-5">People from your organisation</Label
      >
      <div
        class=" gap-12 md:gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {#each data.people as people}
          <PeopleCard {...people} />
        {/each}
      </div>
    </div>
    <div class="p-10">
      <Label styleClass="text-primary pb-5">Discover</Label>
      <div
        class=" gap-12 md:gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {#each data.discover as item}
          <BrowseCard {...item} />
        {/each}
      </div>
    </div>
    <div />
  {/if}
</LayoutWithNav>

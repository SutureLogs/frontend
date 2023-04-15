<script>
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
  let BASEURL = import.meta.env.VITE_BASEURL;
  let data = {
    trending: [
      {
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
      {
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
    discover: [],
  };
  let loading = true;
  onMount(async () => {
    loading = true;
    try {
      const res = await axios.get(BASEURL + "/surgery/browse", {
        headers: {
          token: $store.jwt,
        },
      });

      console.log(res.data);

      data.discover = res.data.discover.map((item) => {
        let leadsurgeon = item.surgeryTeam.find(
          (member) => member.role === "Lead Surgeon"
        );
        return {
          surgeryName: item.surgeryTitle,
          doctorName: leadsurgeon.doctorName,
          doctorTitle: leadsurgeon.doctorTitle,
          doctorImage: leadsurgeon.doctorProfilePic,
          surgeryImage: item.thumbnailLink,
          orgName: item.surgeryOrg,
          logID: item._id,
        };
      });
      data.trending = res.data.trending.map((item) => {
        let leadsurgeon = item.surgeryTeam.find(
          (member) => member.role === "Lead Surgeon"
        );
        return {
          surgeryName: item.surgeryTitle,
          doctorName: leadsurgeon.doctorName,
          doctorTitle: leadsurgeon.doctorTitle,
          doctorImage: leadsurgeon.doctorProfilePic,
          surgeryImage: item.thumbnailLink,
          orgName: item.surgeryOrg,
          logID: item._id,
        };
      });
      loading = false;
    } catch (err) {
      toast.error("Error fetching data");
    }
  });
</script>

<LayoutWithNav>
  {#if loading}
    <Loading />
  {:else}
    <div
      class="flex md:justify-between justify-center items-center gap-3 p-5 border-b-2"
    >
      <SearchInput />
      <div class="hidden md:block">
        <IconButton icon={plus} />
      </div>
    </div>
    <div class="p-10 w-full h-full">
      <div
        class="label-text-alt flex gap-3 items-center uppercase py-6 font-bold text-[#4669C1] tracking-widest"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z"
            clip-rule="evenodd"
          />
        </svg>

        <div>trending</div>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-10">
        {#each data.trending as item}
          <BrowseCard {...item} logID={item.logID} />
        {/each}
      </div>

      <!-- continue watching -->
      <!-- <div
      class="label-text-alt flex gap-3 items-center uppercase py-6 pt-20 font-bold text-[#4669C1] tracking-widest"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          d="M15 6.75a.75.75 0 00-.75.75V18a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H15zM20.25 6.75a.75.75 0 00-.75.75V18c0 .414.336.75.75.75H21a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75h-.75zM5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061z"
        />
      </svg>

      <div>continue watching</div>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
      {#each data.continuewatching as item}
        <BrowseCard {...item} />
      {/each}
    </div> -->
      <!-- discover -->
      <div
        class="label-text-alt flex gap-3 items-center uppercase py-6 pt-20 font-bold text-[#4669C1] tracking-widest"
      >
        <img src={compass} class="w-6 h-6" alt="" srcset="" />

        <div>discover</div>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
        {#each data.discover as item}
          <BrowseCard {...item} logID={item.logID} />
        {/each}
      </div>
    </div>
  {/if}
</LayoutWithNav>

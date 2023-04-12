<script>
  // @ts-nocheck

  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import SearchCard from "../components/design/cards/SearchCard.svelte";
  import SearchInput from "../components/design/inputs/SearchInput.svelte";
  export let params = {};
  export let searchText = params.searchText || "";

  let data = {
    searchResults: [
      {
        logID: "1",
        surgeryName: "Heart Surgery",
        img: "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        surgeonName: "Dr. John Doe",
        orgName: "Org 1",
      },
      {
        logID: "1",
        surgeryName: "Heart Surgery",
        img: "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        surgeonName: "Dr. John Doe",
        orgName: "Org 1",
      },
      {
        logID: "1",
        surgeryName: "Heart Surgery",
        img: "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        surgeonName: "Dr. John Doe",
        orgName: "Org 1",
      },
      {
        logID: "1",
        surgeryName: "Heart Surgery",
        img: "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        surgeonName: "Dr. John Doe",
        orgName: "Org 1",
      },
      {
        logID: "1",
        surgeryName: "Heart Surgery",
        img: "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg",
        surgeonName: "Dr. John Doe",
        orgName: "Org 1",
      },
    ],
  };
</script>

<LayoutWithNav>
  <div class="flex flex-col gap-7 p-10 w-full">
    <SearchInput
      placeholderText="Search for surgery logs by title, organization, or Member"
      onClick={() => {}}
      styleClass="w-full"
      bind:value={searchText}
    />
    <div class="grid grid-cols-3 gap-10">
      {#each data.searchResults as result}
        <SearchCard
          surgeryName={result.surgeryName}
          img={result.img}
          surgeonName={result.surgeonName}
          orgName={result.orgName}
          logID={result.logID}
        />
      {/each}
    </div>
  </div>
</LayoutWithNav>

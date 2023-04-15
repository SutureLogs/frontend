<script>
  // @ts-nocheck

  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import SearchCard from "../components/design/cards/SearchCard.svelte";
  import SearchInput from "../components/design/inputs/SearchInput.svelte";
  export let params = {};
  export let searchText = params.searchText || "";

  let data = {
    searchResults: [],
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
    {#if data.searchResults.length === 0}
      <div class="text-center flex flex-col h-full w-full">
        <h1 class="text-2xl font-bold">No results found</h1>
        <p class="text-gray-500">Try searching for something else</p>
      </div>
    {/if}
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

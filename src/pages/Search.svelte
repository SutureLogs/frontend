<script>
  import { onMount } from "svelte";

  // @ts-nocheck

  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import SearchCard from "../components/design/cards/SearchCard.svelte";
  import SearchInput from "../components/design/inputs/SearchInput.svelte";

  import axios from "axios";
  import { store } from "../stores/store";
  import { toast } from "svelte-french-toast";
  import Loading from "../components/Loading.svelte";
  let BASEURL = import.meta.env.VITE_BASEURL;

  export let params = {};
  export let searchText = params.searchText || "";

  onMount(async () => {
    await dataload();
  });

  let loading = false;
  async function dataload() {
    loading = true;
    let response = await axios.post(
      BASEURL + "/surgery/search",
      {
        searchQuery: searchText,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    console.log(response.data);
    data.searchResults = response.data.surgeries;
    loading = false;
  }

  let data = {
    searchResults: [],
  };
</script>

<LayoutWithNav>
  {#if loading}
    <div class="h-full">
      <Loading />
    </div>
  {:else}
    <div class="flex flex-col gap-7 p-10 w-full">
      <SearchInput
        placeholderText="Search for surgery logs by title, organization, or Member"
        onClick={() => {
          dataload();
        }}
        styleClass="w-full"
        bind:value={searchText}
      />
      {#if data.searchResults.length === 0}
        <div class="text-center flex flex-col h-full w-full">
          <h1 class="text-2xl font-bold">No results found</h1>
          <p class="text-gray-500">Try searching for something else</p>
        </div>
      {/if}
      <div class="grid md:grid-cols-3 gap-10">
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
  {/if}
</LayoutWithNav>

<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import SearchCard from "../components/design/cards/SearchCard.svelte";
  import SearchInput from "../components/design/inputs/SearchInput.svelte";
  import axios from "axios";
  import { store } from "../stores/store";
  import Loading from "../components/Loading.svelte";
  import Label from "../components/design/titles/Label.svelte";
  let BASEURL = import.meta.env.VITE_BASEURL;

  export let params = {};
  export let searchText = params.searchText || "";
  export let aiSearch = params.mode === "ai";

  onMount(async () => {
    await dataload();
  });

  let loading = false;
  async function dataload() {
    loading = true;
    searchText = searchText.trim();
    let URL = "";
    if (aiSearch) URL = BASEURL + "/surgery/semantic-search";
    else URL = BASEURL + "/surgery/search";
    let response = await axios.post(
      URL,
      {
        searchQuery: searchText,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
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
      <div>
        <form on:submit|preventDefault={dataload} class=" flex flex-col gap-3">
          <div class="w-full">
            <label class="input-group m-0 p-0">
              {#if aiSearch}
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label border-2 text-primary px-5 bg-gray-100">
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
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </label>
              {/if}
              <input
                type="text"
                bind:value={searchText}
                placeholder={"Search for a surgery"}
                class="input input-bordered w-full bg-transparent text-black"
              />
              <button type="submit" class="btn text-white"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </div>
          <div class="flex gap-2 items-center">
            <Label styleClass="">AI Search</Label>
            <input bind:checked={aiSearch} type="checkbox" class="toggle" />
          </div>
        </form>
      </div>
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

<script>
  import { pop, push } from "svelte-spa-router";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import left from "../assets/icons/left.png";
  import Label from "../components/design/titles/Label.svelte";
  import axios from "axios";
  import Button from "../components/design/buttons/Button.svelte";
  import { onMount } from "svelte";
  import Loading from "../components/Loading.svelte";
  import { store } from "../stores/store";
  import GoBackToBrowseButton from "../components/design/buttons/GoBackToBrowseButton.svelte";

  let loading = true;

  export let params = {};
  let BASEURL = import.meta.env.VITE_BASEURL;

  async function dataload() {
    loading = true;
    const res = await axios.get(
      BASEURL + "/surgery/flashcards?id=" + params.id,
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    console.log(res.data);
    if (res) data = res.data.cards;

    data = data.map((item) => {
      return { ...item, flipped: false };
    });

    loading = false;
  }

  onMount(async () => {
    await dataload();
  });

  let data = [
    {
      explanation:
        "This is a type of plant that grows underground and is commonly used in cooking. It has a bulbous shape and papery skin that needs to be removed before consumption. When sliced, it releases a pungent odor that can make eyes water.",
      concept: "Onion",
    },
  ];
</script>

<LayoutWithLogNav {params}>
  {#if loading}
    <div class="h-full w-full">
      <Loading>
        <div class="animate-pulse">
          We are generating the flash cards. Please wait
        </div>
      </Loading>
    </div>
  {:else}
    <div class="p-10 h-full">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <GoBackToBrowseButton navLink={"/learn/" + params.id} />
      </div>
      <Heading2>Flash Cards</Heading2>
      <div class="grid md:grid-cols-3 h-full">
        {#each data as { explanation, concept, flipped }}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          {#if flipped}
            <div
              class="bg-primary text-white shadow-md cursor-pointer rounded-lg p-4 m-4 flex flex-col justify-center items-center"
              on:click={() => {
                flipped = !flipped;
              }}
            >
              <div class="text-xl font-bold text-center">
                {concept}
              </div>
            </div>
          {:else}
            <div
              class="bg-white shadow-md cursor-pointer rounded-lg p-4 m-4 flex flex-col justify-center items-center"
              on:click={() => {
                flipped = !flipped;
              }}
            >
              <div class="text-xl text-center">
                {explanation}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</LayoutWithLogNav>

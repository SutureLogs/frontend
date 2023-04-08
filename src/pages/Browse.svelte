<script>
  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import BrowseCard from "../components/design/cards/BrowseCard.svelte";
  import SearchInput from "../components/design/inputs/SearchInput.svelte";
</script>

<LayoutWithNav>
  <!-- <div class="flex flex-col gap-3 p-5 border-b-2">
    <SearchInput />
  </div> -->
  <div class="p-10 w-full h-full">
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      <BrowseCard />
      <BrowseCard />
    </div>
  </div>
</LayoutWithNav>

<script>
  import moment from "moment";
  import NotesImageCard from "./design/cards/NotesImageCard.svelte";
  import NotesTextCard from "./design/cards/NotesTextCard.svelte";
  import NotesVideoCard from "./design/cards/NotesVideoCard.svelte";
  export let notes = [];
  export let doctorName = "Dr. John Doe";
  export let doctorImage = "https://via.placeholder.com/1000";
  export let createdAt = "2021-08-10T12:00:00.000Z";
</script>

<div class="flex w-full flex-col p-2 xl:px-48 col-span-3">
  <div class="flex gap-3 divider items-center my-8">
    <div class="flex flex-col items-center">
      <b>{doctorName},</b>
      <span class="text-xs text-right opacity-50"
        >{moment(createdAt).format("MMMM Do YYYY, h:mm a")}</span
      >
    </div>
  </div>
  {#each notes as note}
    {#if note.elementType === "text"}
      <NotesTextCard textContent={note.textContent} />
    {/if}
    {#if note.elementType === "image"}
      <NotesImageCard imgURL={note.imgURL} altText={note.altText} />
    {/if}
    {#if note.elementType === "video"}
      <NotesVideoCard />
    {/if}
  {/each}
</div>

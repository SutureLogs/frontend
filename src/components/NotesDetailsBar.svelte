<script>
  import Label from "../components/design/titles/Label.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import PatientDetailsTable from "../components/design/tables/PatientDetailsTable.svelte";
</script>

<div class=" hidden xl:flex flex-col gap-2 fixed w-full">
  <div class="mx-5 flex gap-2 flex-col">
    <Label styleClass="my-3 ">Surgery Details</Label>
    <Heading2>Belsey fundoplication</Heading2>
    <Label>conducted at Aster Hospital</Label>
    <Label styleClass="opacity-40">on 5 May, 2020</Label>
  </div>
  <PatientDetailsTable styleClass="my-7" labelStyle="mx-5" />
  <Label styleClass="text-primary my-3 mx-5">Surgical Team</Label>
  <div class="flex flex-col">
    <div class="py-4 flex px-5 items-center gap-3 first:border-y-2 border-b-2">
      <!-- svelte-ignore a11y-missing-attribute -->
      <img
        src="https://via.placeholder.com/134"
        class="rounded-full w-10 h-10"
      />
      <div class="">
        <div class="font-bold line-clamp-1">Dr. Yajat Vinod Vishwakarma</div>
        <Label styleClass="opacity-40">Doc Name</Label>
      </div>
    </div>
  </div>
</div>

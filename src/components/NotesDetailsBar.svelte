<script>
  import Label from "../components/design/titles/Label.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import PatientDetailsTable from "../components/design/tables/PatientDetailsTable.svelte";
  import NotesSideBarDoctorCard from "./design/cards/NotesSideBarDoctorCard.svelte";
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
    <NotesSideBarDoctorCard />
    <NotesSideBarDoctorCard />
    <NotesSideBarDoctorCard />
  </div>
</div>

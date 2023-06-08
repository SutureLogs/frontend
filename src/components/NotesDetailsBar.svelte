<script>
  import Label from "../components/design/titles/Label.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import NotesSideBarDoctorCard from "./design/cards/NotesSideBarDoctorCard.svelte";
  import moment from "moment";
  import PatientDetailsTable from "./design/tables/PatientDetailsTable.svelte";
  export let surgeryName = "Belsey fundoplication";
  export let orgName = "Organization Name";
  export let surgeryDate = "5 May, 2020";
  export let patientAge = 23;
  export let patientGender = "-";
  export let surgicalTeamName = [
    {
      doctorName: "Dr. John Doe",
      doctorRole: "Surgeon",
      doctorId: "1",
    },
  ];
</script>

<div class="hidden xl:flex flex-col gap-2 w-full pt-10">
  <div class="mx-5 flex gap-2 flex-col">
    <Label styleClass="my-3 ">Surgery Details</Label>
    <Heading2>{surgeryName}</Heading2>
    <Label>conducted at {orgName}</Label>
    <Label styleClass="opacity-40"
      >on {moment(surgeryDate).format("DD MMMM, YYYY")}</Label
    >
  </div>

  <Label styleClass="text-primary my-3 mx-5 mt-10">Surgical Team</Label>
  <div class="flex flex-col">
    {#each surgicalTeamName as doctor}
      <NotesSideBarDoctorCard
        doctorId={doctor.doctorId}
        doctorName={doctor.doctorName}
        doctorRole={doctor.doctorRole}
      />
    {/each}
  </div>
  <PatientDetailsTable
    styleClass=" mt-10"
    labelStyle="mx-5"
    age={patientAge}
    gender={patientGender}
  />
</div>

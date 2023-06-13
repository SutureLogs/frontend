<script>
  import PatientSurgeryButton from "../components/design/buttons/PatientSurgeryButton.svelte";
  import logo from "../assets/logoblack.png";
  export let surgeries = [];
  export let currentSurgeryDetail = {};
  export let patientId = "";
  console.log(surgeries, "from notes nav");
</script>

<div
  class="h-full hidden fixed w-96 xl:flex items-center flex-col col-span-1 border-r-2"
>
  <div class="flex gap-2 border-b-2 w-full items-center justify-center p-10">
    <img src={logo} class="w-10 object-contain" alt="" />
    <div class="font-black text-2xl">
      Suture<span class="text-primary">Logs</span>
    </div>
  </div>
  <div class="w-full mt-4">
    {#each surgeries as surgery, index}
      <PatientSurgeryButton
        {patientId}
        surgeryName={surgery.surgeryName}
        surgeryId={surgery.surgeryId}
        index={index + 1}
        isActive={surgery.surgeryId === currentSurgeryDetail.surgeryId}
      />
    {/each}
  </div>
</div>
<div class="xl:hidden">bro</div>

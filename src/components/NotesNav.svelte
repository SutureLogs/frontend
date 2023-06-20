<script>
  import PatientSurgeryButton from "../components/design/buttons/PatientSurgeryButton.svelte";
  import logo from "../assets/logoblack.png";
  export let surgeries = [];
  export let currentSurgeryDetail = {};
  export let patientId = "";
  let isOpen = false;
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
<div class="xl:hidden w-full relative">
  <div
    class="flex gap-2 border-b-2 w-full items-center justify-between md:p-10 px-4 py-10"
  >
    <div class="flex gap-2 items-center">
      <img src={logo} class="w-10 object-contain" alt="" />
      <div class="font-black text-2xl">
        Suture<span class="text-primary">Logs</span>
      </div>
    </div>
    <button on:click={() => (isOpen = true)}>
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
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  </div>

  <div
    class="fixed top-0 left-0 -translate-x-full transition-all delay-300 bg-white h-screen py-10 w-9/12 z-10 {isOpen
      ? 'fixed translate-x-0'
      : 'hidden'}"
  >
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

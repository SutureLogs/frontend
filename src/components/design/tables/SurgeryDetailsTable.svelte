<script>
  import { push } from "svelte-spa-router";
  import LinkButton from "../buttons/LinkButton.svelte";
  import Label from "../titles/Label.svelte";
  export let duration = 23;
  export let styleClass = "";
  export let team = [
    {
      doctorId: "1",
      doctorName: "Dr. John Doe",
      role: "Surgeon",
    },
  ];
</script>

<div class={`${styleClass}`}>
  <Label styleClass="text-primary border-b-2 pb-3">Surgery DETAILS</Label>
  <div class="flex flex-col">
    <div class="p-5 flex justify-between border-b-2">
      <Label styleClass="opacity-75">duration</Label>
      <Label>{duration} mins</Label>
    </div>
    {#each team as member}
      <div class="p-5 flex justify-between items-center border-b-2">
        <Label styleClass="opacity-75">{member.role}</Label>
        <LinkButton
          styleClass="text-primary py-0"
          buttonText={member.doctorName}
          onClick={() => push(`/profile/` + member.doctorId)}
        />
      </div>
    {/each}
  </div>
</div>

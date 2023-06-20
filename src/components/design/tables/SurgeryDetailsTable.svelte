<script>
  import { push } from "svelte-spa-router";
  import LinkButton from "../buttons/LinkButton.svelte";
  import Label from "../titles/Label.svelte";
  export let duration = 23;
  export let styleClass = "";
  let BASEURL = import.meta.env.VITE_BASEURL;
  export let team = [
    {
      doctorId: "1",
      doctorName: "Dr. John Doe",
      role: "Surgeon",
      doctorImage: "",
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
        <div class="flex gap-2 items-center">
          <img
            src={member.doctorProfilePic
              ? BASEURL + "/surgery/img/" + member.doctorProfilePic
              : `https://api.dicebear.com/6.x/initials/svg?seed=${member.doctorName}`}
            class="w-6 h-6 rounded-full object-cover"
            alt=""
          />
          <LinkButton
            styleClass="text-primary py-0 line-clamp-1 max-w-md"
            buttonText={member.doctorName}
            onClick={() => push(`/profile/` + member.doctorId)}
          />
        </div>
      </div>
    {/each}
  </div>
</div>

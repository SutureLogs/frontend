<script>
  import { push } from "svelte-spa-router";
  import LinkButton from "../buttons/LinkButton.svelte";
  import Label from "../titles/Label.svelte";
  import Paragraph from "../titles/Paragraph.svelte";
  export let label = "Notes";
  export let styleClass = "";
  export let data = [
    {
      surgeonName: "Yajat",
      userID: "yajat",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
      logID: "tes",
      logName: "tes",
    },
  ];
</script>

<div class={`${styleClass}`}>
  <Label styleClass="text-primary border-b-2 pb-3">{label}</Label>
  <div class={`flex flex-col gap-3 pt-2 `}>
    {#each data as { surgeonName, userID, note, logName, logID }}
      <div class="flex flex-col gap-3 border-b-2 py-3">
        <Paragraph>{note}</Paragraph>
        <div class="flex justify-between items-center">
          <LinkButton
            styleClass="text-amber-600 py-0"
            buttonText={surgeonName}
            onClick={() => push(`/profile/` + userID)}
          />
          <div class="flex gap-2 items-center">
            <Label>Left a note during</Label>
            <LinkButton
              styleClass="text-amber-600 py-0"
              buttonText={logName}
              onClick={() => push(`/base/` + logID)}
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

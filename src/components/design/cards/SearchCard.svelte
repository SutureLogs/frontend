<script>
  import { push } from "svelte-spa-router";
  import Paragraph from "../titles/Paragraph.svelte";
  import Subheading from "../titles/Subheading.svelte";

  let BASEURL = import.meta.env.VITE_BASEURL;
  export let styleClass;
  export let img;
  export let surgeryName;
  export let surgeonName;
  export let orgName;
  export let logID;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => push("/base/" + logID)}
  class=" flex flex-col {styleClass} hover:scale-95 transition-all duration-300 cursor-pointer"
>
  <div class="relative group">
    <img
      class="aspect-video w-full h-full object-cover rounded-xl"
      src={BASEURL + "/surgery/img/" + img}
      alt=""
      srcset=""
    />
  </div>
  <Subheading styleClass="mt-3">
    {surgeryName}
  </Subheading>
  <Paragraph styleClass="opacity-40">by {surgeonName} at {orgName}</Paragraph>
</div>

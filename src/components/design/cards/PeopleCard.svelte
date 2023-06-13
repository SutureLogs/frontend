<script>
  import { push } from "svelte-spa-router";

  export let doctorId;
  export let doctorName;
  export let doctorTitle;
  export let doctorImage;
  export let doctorDepartment;
  let BASEURL = import.meta.env.VITE_BASEURL;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => push("/profile/" + doctorId)}
  class="flex border rounded-lg p-4 flex-wrap items-center gap-3 hover:scale-95 transition-all cursor-pointer duration-300"
>
  <img
    src={BASEURL + "/surgery/img/" + doctorImage}
    class="w-14 h-14 rounded-full object-cover"
    alt=""
    srcset=""
  />
  <div>
    <div class="text-lg font-bold">{doctorName}</div>
    <div class="text-sm opacity-50 font-bold">
      {doctorTitle} , {doctorDepartment}
    </div>
  </div>
</div>

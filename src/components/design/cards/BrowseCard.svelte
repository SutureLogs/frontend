<script>
  import { push } from "svelte-spa-router";

  export let surgeryName;
  export let doctorName;
  export let doctorTitle;
  export let doctorImage;
  export let surgeryImage;
  export let orgName;
  export let logID;
  let BASEURL = import.meta.env.VITE_BASEURL;

  const navigate = () => {
    push("/base/" + logID);
  };
  //https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg
  // https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={navigate} class="flex flex-col lg:hidden">
  <img
    src={BASEURL + "/surgery/img/" + surgeryImage}
    alt=""
    class="aspect-video w-full object-cover rounded-xl"
  />
  <div class="text-xl font-semibold mt-3 line-clamp-2">
    {surgeryName}
  </div>
  <div class="flex items-center gap-3 mt-5">
    <div>
      <img
        src={BASEURL + "/surgery/img/" + doctorImage}
        alt=""
        class="w-10 h-10 rounded-full border-2 border-blue-400"
      />
    </div>
    <div class="flex flex-col">
      <div class=" font-bold">{doctorName}</div>
      <div class="text-sm">{doctorTitle}</div>
    </div>
  </div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={navigate}
  class="hidden lg:flex flex-col hover:scale-[98%] cursor-pointer transition-all duration-200"
>
  <div class="flex gap-4 items-center">
    <div>
      <img
        src={doctorImage}
        alt=""
        class="w-12 h-12 rounded-full border-2 border-blue-400"
      />
    </div>
    <div>
      <div class="flex gap-3 items-center">
        <div class="text- font-bold">{doctorName}</div>
        <div class="w-2 h-2 bg-primary rounded-full" />
        <div class="">{doctorTitle}</div>
      </div>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        class="label-text-alt capitalize py-2 font-bold text-[#4669C1] tracking-wider"
      >
        {orgName}</label
      >
    </div>
  </div>
  <div class="mt-4">
    <img
      src={surgeryImage}
      alt=""
      class="aspect-video w-full object-cover rounded-xl"
    />
    <div class="p-2 text-lg font-semibold">
      {surgeryName}
    </div>
  </div>
</div>

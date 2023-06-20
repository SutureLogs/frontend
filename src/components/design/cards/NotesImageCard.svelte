<script>
  export let altText = "";
  let BASEURL = import.meta.env.VITE_BASEURL;
  export let imgURL =
    "https://images.unsplash.com/photo-1622837137191-4b6b2b0b0b0a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhdHRsZSUyMGFzc2lzdGFudCUyMHN1cmdpY2FsJTIwY2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
</script>

<div>
  {#if imgURL}
    <img src={BASEURL +"/surgery/img/"+ imgURL} class="w-full object-contain my-3 rounded-xl" alt="" />
  {/if}
  {#if altText}
    <div class="text-center italic">{altText}</div>
  {/if}
</div>

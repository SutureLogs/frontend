<script>
  import { push } from "svelte-spa-router";
  import Subheading from "../titles/Subheading.svelte";
  export let img = "";
  export let logID = "";
  export let styleClass = "";
  export let surgeryName = "";
  export let visibility = "";
  export let editable = true;
  let BASEURL = import.meta.env.VITE_BASEURL;
</script>

<div class=" flex flex-col {styleClass}">
  <div class="relative group">
    <div
      class="absolute group-hover:flex transition hidden inset-0 rounded-xl bg-opacity-50 bg-black justify-center items-center gap-10"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => push("/base/" + logID)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-white hover:scale-75 cursor-pointer transition-all"
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path
            fill-rule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      {#if editable}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => push("/edit/" + logID)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-white hover:scale-75 cursor-pointer transition-all"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
            />
          </svg>
        </div>
      {/if}
    </div>
    <img
      class="aspect-video w-full h-full object-cover rounded-xl"
      src={BASEURL + "/surgery/img/" + img}
      alt=""
      srcset=""
    />
  </div>
  <div class="flex flex-col">
    <Subheading styleClass="mt-3">
      {surgeryName}
    </Subheading>
    <div class="badge badge-outline mt-1">{visibility}</div>
  </div>
</div>

<script>
  import axios from "axios";
  import toast from "svelte-french-toast";

  let BASEURL = import.meta.env.VITE_BASEURL;
  export let items = [];
  export async function addItem(item) {
    if (!item) return;
    const response = await axios.get(
      BASEURL + `/doctor/username-exists?username=${item}`
    );
    if (response.data.exists === false) {
      toast.error("Username does not exist");
      return;
    }
    items = [...items, item];
    newitem = "";
  }
  export function removeItem(item) {
    items = items.filter((i) => i !== item);
    items = [...items];
  }
  export let label = "";
  export let actionText = "Add Item";
  let newitem = "";
</script>

<form
  on:submit|preventDefault={() => addItem(newitem.trim())}
  class="flex flex-col gap-2"
>
  <label
    for="inpt"
    class="label-text-alt uppercase py-2 font-bold text-[#4669C1] tracking-widest"
  >
    {label}</label
  >
  <div class="flex gap-2 flex-wrap items-center">
    {#each items as i}
      <div class="px-5 py-2 rounded-xl border flex gap-2 items-center">
        {i}
        <button
          on:click={() => removeItem(i)}
          class="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-4 h-4 hover:text-red-500"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    {/each}
    <input
      bind:value={newitem}
      class="input input-bordered text-sm rounded-xl border bg-transparent"
      placeholder={actionText}
      type="text"
    />
    <button class="btn btn-circle btn-sm">+</button>
  </div>
</form>

<script>
  export let items = [];
  export function addItem(item) {
    items = [...items, item];
  }
  export function removeItem(item) {
    items = items.filter((i) => i !== item);
    items = [...items];
  }
  export let label = "";
  let newitem = "";
</script>

<div class="flex flex-col gap-2">
  <label
    for="inpt"
    class="label-text-alt uppercase py-2 font-bold text-[#4669C1] tracking-widest"
  >
    {label}</label
  >
  <div class="flex gap-2 flex-wrap">
    {#each items as i}
      <div class="px-3 py-2 rounded-full border flex gap-2 items-center">
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
      class="px-3 py-2 rounded-full border bg-transparent outline-none"
      placeholder="Add item"
      type="text"
      on:keydown={(e) => {
        if (e.key === "Enter" && newitem !== "") {
          addItem(newitem);
          newitem = "";
        }
      }}
    />
  </div>
</div>

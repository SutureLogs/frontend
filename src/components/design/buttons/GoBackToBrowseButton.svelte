<script>
  import { push } from "svelte-spa-router";
  export let navLink = "";
</script>

<button
  class="btn btn-circle btn-sm px-0 m-0 my-4"
  on:click={() => push(`${navLink ? navLink : "/browse"}`)}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-4 h-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
</button>

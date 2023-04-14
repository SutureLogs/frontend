<script>
  import logo from "../assets/logoblack.png";
  import NavigationButton from "./design/buttons/NavigationButton.svelte";
  import { location } from "svelte-spa-router";

  // icons import
  import portfolio from "../assets/icons/portfolio.png";
  import learn from "../assets/icons/learn.png";
  import browse from "../assets/icons/browse.png";
  import search from "../assets/icons/search.png";
  import create from "../assets/icons/plusblack.png";
  import profile from "../assets/icons/profile.png";

  let navlinks = [
    {
      name: "Browse",
      icon: browse,
      link: "/browse",
    },

    {
      name: "Search",
      icon: search,
      link: "/search",
    },
    {
      name: "Portfolio",
      icon: portfolio,
      link: "/portfolio",
    },
    {
      name: "Create",
      icon: create,
      link: "/create",
    },
  ];
  let notmobilemenu;
</script>

<div class="relative">
  <!-- mobile -->
  <div class="flex md:hidden justify-between p-7">
    <div class="flex">
      <img src={logo} class="w-10 object-contain" alt="" />
    </div>
    <button
      on:click={() => {
        notmobilemenu.classList.toggle("-translate-x-full");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <!-- not mobile  -->
  <div
    bind:this={notmobilemenu}
    class="flex flex-col fixed bg-slate-50 z-20 min-h-screen h-full w-64 md:border-r-2 items-center pt-10 inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out"
  >
    <div class="flex gap-2 items-center justify-center">
      <img src={logo} class="w-10 object-contain" alt="" />
      <div class="font-black text-2xl">
        Suture<span class="text-primary">Logs</span>
      </div>
    </div>
    <nav class="flex flex-col w-full gap-3 pt-12">
      {#each navlinks as link}
        <NavigationButton
          svg={link.icon}
          link={link.link}
          label={link.name}
          isActive={$location === link.link}
        />
      {/each}
    </nav>
    <nav class="flex flex-col w-full gap-3 py-5 mt-auto border-t-2">
      <NavigationButton
        svg={profile}
        link={"/profile"}
        label={"Profile"}
        isActive={$location === "/profile"}
      />
    </nav>
  </div>
</div>

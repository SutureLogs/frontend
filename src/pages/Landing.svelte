<script>
  import { push } from "svelte-spa-router";
  import logo from "../assets/logoblack.png";
  import Button from "../components/design/buttons/Button.svelte";
  import { store } from "../stores/store";
  import gfg from "../assets/gfg.png";
  import amd from "../assets/amd.png";
  import gcp from "../assets/gcp.png";
  import gh from "../assets/github.png";
</script>

<div
  class="flex h-full min-h-screen justify-center items-center p-7 bg-slate-50 text-black"
>
  <div class="flex flex-col w-full max-w-screen-md gap-7">
    <div class="grid md:grid-cols-2">
      <div class="flex gap-2 items-center">
        <img src={logo} class="w-10 object-contain" alt="" />
        <div class="font-black text-2xl">
          Suture<span class="text-primary">Logs</span>
        </div>
      </div>
      <div class=" gap-5 md:items-end hidden md:flex">
        <img src={gfg} class="md:w-32 object-cover w-full max-w-full" alt="" />
        <img src={amd} class="md:w-24 object-cover w-full max-w-full" alt="" />
        <img src={gcp} class="md:w-32 object-cover w-full max-w-full" alt="" />
      </div>
    </div>

    <div>Before you use the platform,</div>
    <div>
      <div class="text-xl font-bold">What is Suture Logs?</div>
      <div>
        SutureLogs is a platform designed for surgeons to easily record, share
        and analyze detailed surgical logs and outcomes. The platform promotes
        collaboration and knowledge sharing among surgeons, allowing them to
        learn from each other's experiences and stay up-to-date with the latest
        advancements in surgery.
      </div>
    </div>
    <div>
      <div class="text-xl font-bold">Current state of the platform</div>
      <ul class="list-disc">
        <li>
          This demo is a submission to the <b>Solving for India hackathon </b>
          organised by <b>Geeks for Geeks, Google Cloud and AMD.</b>
        </li>
        <li>
          We've managed to build a functional prototype of the platform.
          However, there are a few things that we are still working on.
          Security, performance and availability are some of them.
        </li>
        <li>
          The app is responsive and works on mobile devices as well but we
          recommend to use a monitor to view and interact with the website
        </li>
        <li>
          You can create a new account or use the following credentials to
          login: <a
            target="_blank"
            class="underline text-primary"
            href="https://docs.google.com/document/d/1d09Y-8LNP-wRai_PwMYunXtCV_kVb2SkP4rBnoBlK9Y/edit?usp=sharing"
            >Signin Details</a
          >
        </li>
      </ul>
    </div>

    <div
      class="flex p-3 rounded-lg bg-red-400 font-bold text-white gap-3 items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <div class="w-full">
        The platform has been populated with open surgerical videos being
        performed. If you do not wish to see them, turn on the blur filter
      </div>
      <div class="">
        <div class="text-xs">Blur Filter</div>
        <input
          type="checkbox"
          class="toggle toggle-sm"
          bind:checked={$store.blurSurgeryFilter}
        />
      </div>
    </div>

    <div class="italic flex justify-between items-center">
      <div>
        This is a prototype. Please do not use it for real surgery and use the
        platform responsibly.
      </div>
      <a target="_blank" href="https://github.com/SutureLogs">
        <img
          src={gh}
          alt=""
          class="w-10 h-10 opacity-30 hover:opacity-100 transition-all"
          srcset=""
        />
      </a>
    </div>
    <Button buttonText="Continue" onClick={() => push("/auth")} />

    <div class="flex flex-col gap-10 md:items-end md:hidden opacity-10">
      <img src={gfg} class="md:w-32 object-cover w-full max-w-full" alt="" />
      <img src={amd} class="md:w-32 object-cover w-full max-w-full" alt="" />
      <img src={gcp} class="md:w-32 object-cover w-full max-w-full" alt="" />
    </div>
  </div>
</div>

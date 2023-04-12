<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import { Toaster } from "svelte-french-toast";
</script>

<main>
  <Toaster />
  <Router {routes} />
</main>

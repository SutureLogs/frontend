import Auth from "./pages/Auth.svelte";
import Browse from "./pages/Browse.svelte";
import Onboard from "./pages/Onboard.svelte";
import Portfolio from "./pages/Portfolio.svelte";
import Profile from "./pages/Profile.svelte";

const routes = {
  "/auth": Auth,
  "/onboard": Onboard,
  "/browse": Browse,
  "/profile": Profile,
  "/portfolio": Portfolio,
};
export default routes;

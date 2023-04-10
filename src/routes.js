import Auth from "./pages/Auth.svelte";
import Browse from "./pages/Browse.svelte";
import CreateLog from "./pages/CreateLog.svelte";
import LogBase from "./pages/LogBase.svelte";
import LogDiscuss from "./pages/LogDiscuss.svelte";
import LogLog from "./pages/LogLog.svelte";
import Onboard from "./pages/Onboard.svelte";
import Portfolio from "./pages/Portfolio.svelte";
import Profile from "./pages/Profile.svelte";

const routes = {
  "/auth": Auth,
  "/onboard": Onboard,
  "/browse": Browse,
  "/profile": Profile,
  "/portfolio": Portfolio,
  "/create": CreateLog,
  "/base/:id": LogBase,
  "/log/:id": LogLog,
  "/discuss/:id": LogDiscuss,
};
export default routes;

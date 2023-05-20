import AdminLogin from "./pages/AdminLogin.svelte";
import AdminProfile from "./pages/AdminProfile.svelte";
import AdminUsers from "./pages/AdminUsers.svelte";
import AdminDepartment from "./pages/AdminDepartment.svelte";
import Auth from "./pages/Auth.svelte";
import Broken from "./pages/Broken.svelte";
import Browse from "./pages/Browse.svelte";
import CreateLog from "./pages/CreateLog.svelte";
import Landing from "./pages/Landing.svelte";
import Learn from "./pages/Learn.svelte";
import LearnFlash from "./pages/LearnFlash.svelte";
import LearnQuiz from "./pages/LearnQuiz.svelte";
import LogBase from "./pages/LogBase.svelte";
import LogDiscuss from "./pages/LogDiscuss.svelte";
import LogEdit from "./pages/LogEdit.svelte";
import LogLog from "./pages/LogLog.svelte";
import Onboard from "./pages/Onboard.svelte";
import Portfolio from "./pages/Portfolio.svelte";
import Profile from "./pages/Profile.svelte";
import Search from "./pages/Search.svelte";

const routes = {
  "/auth": Auth,
  "/admin/auth": AdminLogin,
  "/admin/": AdminDepartment,
  "/admin/profile": AdminProfile,
  "/admin/users": AdminUsers,
  "/onboard": Onboard,
  "/browse": Browse,
  "/profile/:id?": Profile,
  "/portfolio": Portfolio,
  "/create": CreateLog,
  "/search/:searchText?": Search,
  "/base/:id": LogBase,
  "/learn/:id": Learn,
  "/learn/quiz/:id": LearnQuiz,
  "/learn/flash/:id": LearnFlash,
  "/log/:id": LogLog,
  "/discuss/:id": LogDiscuss,
  "/edit/:id": LogEdit,
  "/": Landing,
  "*": Broken,
};
export default routes;

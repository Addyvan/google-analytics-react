// Layout Types
import DefaultLayout from "./layouts/Default";

// Route Views
import PageA from "./containers/PageA";
import Onboard from "./containers/Onboard";
import PageC from "./containers/PageC";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: PageA
  },
  {
    path: "/PageA",
    layout: DefaultLayout,
    component: PageA
  },
  {
    path: "/onboard",
    layout: DefaultLayout,
    component: Onboard
  },
  {
    path: "/PageC",
    layout: DefaultLayout,
    component: PageC
  },
];
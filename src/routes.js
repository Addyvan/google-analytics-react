// Layout Types
import DefaultLayout from "./layouts/Default";

// Route Views
import PageA from "./containers/PageA";
import PageB from "./containers/PageB";
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
    path: "/PageB",
    layout: DefaultLayout,
    component: PageB
  },
  {
    path: "/PageC",
    layout: DefaultLayout,
    component: PageC
  },
];
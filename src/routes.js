import { Dashboard } from "./features/dashboard";

export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    exact: true
  },
  { from: "/", to: "/dashboard", redirect: true }
];

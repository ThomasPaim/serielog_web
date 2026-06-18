import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import NovaSerieView from "../views/NovaSerieView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/series/nova",
    name: "nova-serie",
    component: NovaSerieView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
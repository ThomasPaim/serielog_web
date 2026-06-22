import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import NovaSerieView from "../views/NovaSerieView.vue";
import DetalheSerieView from "../views/DetalheSerieView.vue";

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
  },
  {
    path: "/series/:id",
    name: "editar-serie",
    component: DetalheSerieView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

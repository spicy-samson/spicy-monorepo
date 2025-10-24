import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue"; // you can replace with actual Home page component

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("../views/ShopView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

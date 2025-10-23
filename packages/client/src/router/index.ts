import { createRouter, createWebHistory } from "vue-router";
import Home from "../App.vue"; // you can replace with actual Home page component

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

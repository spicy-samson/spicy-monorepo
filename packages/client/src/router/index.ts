import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        layout: DefaultLayout,
        requiresAuth: true,
      },
    },
    {
      path: "/shop",
      name: "Shop",
      component: () => import("../views/ShopView.vue"),
      meta: {
        layout: DefaultLayout,
        requiresAuth: true,
      },
    },
  ],
});

export default router;

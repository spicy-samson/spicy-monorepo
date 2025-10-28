import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
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
    path: "/home",
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
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      layout: DefaultLayout,
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
    meta: {
      layout: DefaultLayout,
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin/AdminView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthRoute = to.path === "/" || to.path === "/register";
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next({ path: "/" });
  } else if (isAuthRoute && user) {
    next({ path: "/home" });
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

let title = "Prosoft";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/",
        redirect: "/ingreso",
      },
      {
        path: "/ingreso",
        name: "ingreso",
        component: () => import("@/views/Login.vue"),
        meta: {
          title: `${title} - Ingreso`,
        },
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = sessionStorage.config;
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !auth) next("Ingreso");
  else next();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;

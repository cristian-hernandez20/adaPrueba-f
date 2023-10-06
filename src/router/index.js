import { createRouter, createWebHistory } from "vue-router";

let title = "Tecno ada";

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
        path: "/",
        component: () => import("@/views/admin/Home.vue"),
        meta: {
          title: `${title} - Compras`,
          requiresAuth: true,
        },
        children: [
          {
            path: "/home-admin",
            name: "Home-admin",
            component: () => import("@/views/admin/HomeAdmin.vue"),
            meta: {
              title: `${title} - Compras`,
              requiresAuth: true,
            },
          },
          {
            path: "/shopping-admin",
            name: "Shopping-admin",
            component: () => import("@/views/admin/ShoppingAdmin.vue"),
            meta: {
              title: `${title} - Compras`,
              requiresAuth: true,
            },
          },
          {
            path: "/productos-admin",
            name: "Productos-admin",
            component: () => import("@/views/admin/ProductAdmin.vue"),
            meta: {
              title: `${title} - Productos`,
              requiresAuth: true,
            },
          },
          {
            path: "/usuarios-admin",
            name: "Usuarios-admin",
            component: () => import("@/views/admin/UserAdmin.vue"),
            meta: {
              title: `${title} - Usuarios`,
              requiresAuth: true,
            },
          },
        ],
      },

      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: `${title} - Productos`,
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !auth) {
    next("Ingreso");
  } else if (!requiresAuth && auth && auth.rol == 2) {
    next({ name: "Home" });
  } else if (!requiresAuth && auth && auth.rol == 1) {
    next({ name: "Home-admin" });
  } else {
    next();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;

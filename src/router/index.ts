import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LocalCache from "@/util/cache";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: () => import("@/views/main/NotFound.vue")
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/user/user.vue"),
    children: [
      {
        path: "/account/login",
        name: "login",
        component: () => import("@/views/user/login/login.vue")
      },
      {
        path: "/account/register",
        name: "register",
        component: () => import("@/views/user/register/register.vue")
      }
    ]
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to) => {
  if (to.matched.length == 0) {
    // 页面不存在
    return "/404";
  }
  if (to.path !== "/account/login") {
    // 未登录
    const token = LocalCache.getCache("token");
    if (!token) {
      // return "/account/login";
    }
  }
});
export default router;

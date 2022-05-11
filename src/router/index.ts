import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/account"
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: () => import("@/pages/Main/NotFound/NotFoundPage.vue")
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/pages/User/UserPage.vue"),
    redirect: "/account/login",
    children: [
      {
        path: "/account/login",
        name: "login",
        component: () => import("@/pages/User/Login/LoginPage.vue")
      },
      {
        path: "/account/register",
        name: "register",
        component: () => import("@/pages/User/Register/RegisterPage.vue")
      }
    ]
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/pages/Main/MainPage.vue"),
    redirect: "/main/teach",
    children: [
      {
        path: "/main/message",
        name: "message",
        component: () => import("@/pages/Main/Message/MessagePage.vue")
      },
      {
        path: "/main/learn",
        name: "learn",
        component: () => import("@/pages/Main/Learn/LearnPage.vue")
      },
      {
        path: "/main/teach",
        name: "teach",
        component: () => import("@/pages/Main/Teach/TeachPage.vue")
      },
      {
        path: "/main/userinfo",
        name: "userinfo",
        component: () => import("@/pages/Main/UserInfo/UserInfoPage.vue")
      },
      {
        path: "/main/exam",
        name: "exam",
        component: () => import("@/pages/Main/Exam/ExamPage.vue")
      }
    ]
  },
  {
    path: "/teachinfo/:courseId",
    name: "teachinfo",
    component: () => import("@/pages/Course/TeachCourse/TeachCoursePage.vue"),
    children: [
      {
        path: "/teachinfo/:courseId/chapter",
        name: "chapter",
        component: () =>
          import("@/pages/Course/TeachCourse/courseMenu/chapter.vue")
      },
      {
        path: "/teachinfo/:courseId/resource",
        name: "resource",
        component: () =>
          import("@/pages/Course/TeachCourse/courseMenu/resource.vue")
      },
      {
        path: "/teachinfo/:courseId/discuss",
        name: "discuss",
        component: () =>
          import("@/pages/Course/TeachCourse/courseMenu/discuss.vue")
      },
      {
        path: "/teachinfo/:courseId/courseExam",
        name: "courseExam",
        component: () =>
          import("@/pages/Course/TeachCourse/courseMenu/courseExam.vue")
      },
      {
        path: "/teachinfo/:courseId/knowledge",
        name: "knowledge",
        component: () =>
          import("@/pages/Course/TeachCourse/courseMenu/knowledge.vue")
      }
    ]
  },
  {
    path: "/learninfo",
    name: "learninfo",
    component: () => import("@/pages/Course/LearnCourse/LearnCoursePage.vue")
  },
  {
    path: "/study/:courseId/:id",
    name: "study",
    component: () => import("@/views/course/teachcourse/detail.vue")
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
  // if (to.path !== "/account/login") {
  //   // 未登录
  //   const token = LocalCache.getCache("token");
  //   if (!token) {
  //     return "/account/login";
  //   }
  // }
});
export default router;

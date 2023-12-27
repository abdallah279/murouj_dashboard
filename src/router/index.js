import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/i18n";

const routes = [
  /********************* Home **********************/
  {
    path: "/",
    name: "home",
    meta: {
      title: "pagesTitle.home",
    },
    component: () => import("@/views/HomeView.vue"),
  },

  /********************* Products **********************/
  {
    path: "/products",
    name: "products",
    meta: {
      title: "pagesTitle.products",
      requiresAuth: true,
    },
    component: () => import("@/views/Products/ProductsView.vue"),
  },
  {
    path: "/productDetailes/:id",
    name: "productDetailes",
    meta: {
      title: "pagesTitle.productDetailes",
    },
    component: () => import("@/views/Products/ProductDetailes.vue"),
  },
  {
    path: "/ourProducts",
    name: "ourProducts",
    meta: {
      title: "pagesTitle.ourProducts",
    },
    component: () => import("@/views/Products/ourProductsView.vue"),
  },

  /********************* Notifications **********************/
  {
    path: "/notifications",
    name: "notifications",
    meta: {
      title: "pagesTitle.notifications",
      requiresAuth: true,
    },
    component: () => import("@/views/NotificationsView.vue"),
  },

  /********************* Contact **********************/
  {
    path: "/contact",
    name: "contact",
    meta: {
      title: "pagesTitle.contact",
    },
    component: () => import("@/views/ContactUs.vue"),
  },

  /********************* Auth **********************/
  {
    path: "/login",
    name: "login",
    meta: {
      title: "pagesTitle.login",
    },
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/create-account",
    name: "create-account",
    meta: {
      title: "pagesTitle.createAccount",
    },
    component: () => import("@/views/auth/CreateAccount.vue"),
  },
  {
    path: "/code-account",
    name: "code-account",
    meta: {
      title: "pagesTitle.code",
    },
    component: () => import("@/views/auth/CodeAccount.vue"),
  },
  {
    path: "/forget-password",
    name: "forget-password",
    meta: {
      title: "pagesTitle.forgetPass",
    },
    component: () => import("@/views/auth/ForgetPassword.vue"),
  },
  {
    path: "/new-password",
    name: "new-password",
    meta: {
      title: "pagesTitle.forgetPass",
    },
    component: () => import("@/views/auth/NewPassword.vue"),
  },

  /********************* Profile **********************/
  {
    path: "/userAccount",
    name: "userAccount",
    meta: {
      title: "pagesTitle.userAccount",
      requiresAuth: true,
    },
    component: () => import("@/views/Profile/UserAccount.vue"),
  },
  {
    path: "/change-phone",
    name: "change-phone",
    meta: {
      title: "pagesTitle.changePhone",
      requiresAuth: true,
    },
    component: () => import("@/views/Profile/ChangePhone.vue"),
  },
  {
    path: "/newPhone",
    name: "newPhone",
    meta: {
      title: "pagesTitle.changePhone",
      requiresAuth: true,
    },
    component: () => import("@/views/Profile/NewPhone.vue"),
  },
  {
    path: "/code-phone",
    name: "code-phone",
    meta: {
      title: "sectionTitle.verificationCode",
      requiresAuth: true,
    },
    component: () => import("@/views/Profile/CodePhone.vue"),
  },

  /********************* Page Not Found **********************/
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    meta: {
      title: "Page Not Found",
    },
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const titleText = to.meta.title
    ? i18n.global.t(`${to.meta.title}`)
    : "Murouj Dashboard";

  document.title = titleText;
  document.getElementById("page_title").innerHTML = titleText;

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
});

export default router;

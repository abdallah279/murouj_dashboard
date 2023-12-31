import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/i18n";

const routes = [
  /********************* Dashboard **********************/
  {
    path: "/MainView",
    name: "MainView",
    meta: {
      title: "pagesTitle.MainView",
    },
    component: () => import("@/views/Dashboard/DashboardView.vue"),
    redirect: { path: "/" },
    children: [
      /********************* Home **********************/
      {
        path: "/",
        name: "home",
        meta: {
          title: "pagesTitle.home",
        },
        component: () => import("@/views/Dashboard/HomeView.vue"),
      },

      /********************* Products **********************/
      {
        path: "/products",
        name: "products",
        meta: {
          title: "pagesTitle.products",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Products/ProductsView.vue"),
      },
      {
        path: "/productDetailes/:id",
        name: "productDetailes",
        meta: {
          title: "pagesTitle.productDetailes",
        },
        component: () =>
          import("@/views/Dashboard/Products/ProductDetailes.vue"),
      },
      {
        path: "/ourProducts",
        name: "ourProducts",
        meta: {
          title: "pagesTitle.ourProducts",
        },
        component: () =>
          import("@/views/Dashboard/Products/ourProductsView.vue"),
      },

      /********************* Orders **********************/
      {
        path: "/orders",
        name: "orders",
        meta: {
          title: "pagesTitle.orders",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Orders/OrdersView.vue"),
        redirect: { path: "/purchaseCurrent" },
        children: [
          /******* طلبات الشراء ********/
          {
            path: "/purchaseOrders",
            name: "purchaseOrders",
            meta: {
              title: "pagesTitle.purchaseOrders",
            },
            component: () => import("@/components/Orders/Purchase Orders/View.vue"),
            redirect: { path: "/purchaseCurrent" },

            children: [

              /**** طلبات الحالية *****/
              {
                path: "/purchaseCurrent",
                name: "purchaseCurrent",
                component: () => import("@/components/Orders/Purchase Orders/CurrentOrders.vue"),
              },

              /**** طلبات المنتهية *****/
              {
                path: "/purchaseFinished",
                name: "purchaseFinished",
                component: () => import("@/components/Orders/Purchase Orders/FinishedOrders.vue"),
              },

              /**** طلبات الملغية *****/
              {
                path: "/purchaseCanceled",
                name: "purchaseCanceled",
                component: () => import("@/components/Orders/Purchase Orders/CanceledOrders.vue"),
              },
            ],
          },

          /******* طلبات الأرجاع ********/
          {
            path: "/returnOrders",
            name: "returnOrders",
            meta: {
              title: "pagesTitle.returnOrders",
            },
            component: () => import("@/components/Orders/Return Orders/View.vue"),
            redirect: { path: "/returnCurrent" },
            children: [

              /**** طلبات الحالية *****/
              {
                path: "/returnCurrent",
                name: "returnCurrent",
                component: () => import("@/components/Orders/Return Orders/CurrentOrders.vue"),
              },

              /**** طلبات المنتهية *****/
              {
                path: "/returnFinished",
                name: "returnFinished",
                component: () => import("@/components/Orders/Return Orders/FinishedOrders.vue"),
              },

              /**** طلبات الملغية *****/
              {
                path: "/returnCanceled",
                name: "returnCanceled",
                component: () => import("@/components/Orders/Return Orders/CanceledOrders.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/orderDetailes/:id",
        name: "orderDetailes",
        meta: {
          title: "pagesTitle.orderDetailes",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Orders/OrderDetailes.vue"),
      },

      /********************* Invoices **********************/
      {
        path: "/invoices",
        name: "invoices",
        meta: {
          title: "pagesTitle.invoices",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Invoices/InvoicesView.vue"),
      },
      {
        path: "/invoiceDetailes/:id",
        name: "invoiceDetailes",
        meta: {
          title: "pagesTitle.invoiceDetailes",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Invoices/InvoiceDetailes.vue"),
      },

      /********************* Invoices **********************/
      {
        path: "/supervisors",
        name: "supervisors",
        meta: {
          title: "pagesTitle.supervisors",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Supervisors/SupervisorsView.vue"),
      },

      /********************* Notifications **********************/
      {
        path: "/notifications",
        name: "notifications",
        meta: {
          title: "pagesTitle.notifications",
          requiresAuth: true,
        },
        component: () => import("@/views//Dashboard/NotificationsView.vue"),
      },

      /********************* Contact **********************/
      {
        path: "/contact",
        name: "contact",
        meta: {
          title: "pagesTitle.contact",
        },
        component: () => import("@/views//Dashboard/ContactUs.vue"),
      },

      /********************* Profile **********************/
      {
        path: "/profile",
        name: "profile",
        meta: {
          title: "pagesTitle.userAccount",
          requiresAuth: true,
        },
        component: () => import("@/views//Dashboard/Profile/UserAccount.vue"),
      },
      {
        path: "/change-phone",
        name: "change-phone",
        meta: {
          title: "pagesTitle.changePhone",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Profile/ChangePhone.vue"),
      },
      {
        path: "/newPhone",
        name: "newPhone",
        meta: {
          title: "pagesTitle.changePhone",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Profile/NewPhone.vue"),
      },
      {
        path: "/code-phone",
        name: "code-phone",
        meta: {
          title: "sectionTitle.verificationCode",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Profile/CodePhone.vue"),
      },
      {
        path: "/change-password",
        name: "change-password",
        meta: {
          title: "sectionTitle.changePassword",
          requiresAuth: true,
        },
        component: () => import("@/views/Dashboard/Profile/ChangePassword.vue"),
      },
    ],
  },

  /********************* Auth **********************/
  {
    path: "/auth",
    name: "auth",
    meta: {
      title: "pagesTitle.Auth",
    },
    component: () => import("@/views/auth/AuthView.vue"),
    redirect: { path: "/login" },
    children: [
      {
        path: "/login",
        name: "login",
        meta: {
          title: "pagesTitle.login",
        },
        component: () => import("@/views/auth/LoginView.vue"),
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
    ],
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
  if (document.getElementById("page_title")) {
    document.getElementById("page_title").innerHTML = titleText;
  }

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
});

export default router;

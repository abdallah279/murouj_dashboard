import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/i18n";

const routes = [
  /********************* Dashboard **********************/
  {
    path: "/MainView",
    name: "MainView",
    meta: {
      title: "pagesTitle.MainView",
      requiresAuth: true,
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
            component: () =>
              import("@/components/Orders/Purchase Orders/View.vue"),
            redirect: { path: "/purchaseCurrent" },

            children: [
              /**** طلبات الحالية *****/
              {
                path: "/purchaseCurrent",
                name: "purchaseCurrent",
                component: () =>
                  import(
                    "@/components/Orders/Purchase Orders/CurrentOrders.vue"
                  ),
              },

              /**** طلبات المنتهية *****/
              {
                path: "/purchaseFinished",
                name: "purchaseFinished",
                component: () =>
                  import(
                    "@/components/Orders/Purchase Orders/FinishedOrders.vue"
                  ),
              },

              /**** طلبات الملغية *****/
              {
                path: "/purchaseCanceled",
                name: "purchaseCanceled",
                component: () =>
                  import(
                    "@/components/Orders/Purchase Orders/CanceledOrders.vue"
                  ),
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
            component: () =>
              import("@/components/Orders/Return Orders/View.vue"),
            redirect: { path: "/returnCurrent" },
            children: [
              /**** طلبات الحالية *****/
              {
                path: "/returnCurrent",
                name: "returnCurrent",
                component: () =>
                  import("@/components/Orders/Return Orders/CurrentOrders.vue"),
              },

              /**** طلبات المنتهية *****/
              {
                path: "/returnFinished",
                name: "returnFinished",
                component: () =>
                  import(
                    "@/components/Orders/Return Orders/FinishedOrders.vue"
                  ),
              },

              /**** طلبات الملغية *****/
              {
                path: "/returnCanceled",
                name: "returnCanceled",
                component: () =>
                  import(
                    "@/components/Orders/Return Orders/CanceledOrders.vue"
                  ),
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
        },
        component: () => import("@/views/Dashboard/Orders/OrderDetailes.vue"),
      },

      /********************* ProvideOrders **********************/
      {
        path: "/ProvideOrders",
        name: "ProvideOrders",
        meta: {
          title: "pagesTitle.ProvideOrders",
        },
        component: () => import("@/views/Dashboard/Orders/ProvideOrders.vue"),
      },

      /********************* Financails **********************/
      {
        path: "/financial",
        name: "financial",
        meta: {
          title: "pagesTitle.financial",
        },
        component: () =>
          import("@/views/Dashboard/Financails/FinancailsView.vue"),
      },
      {
        path: "/settlements",
        name: "settlements",
        meta: {
          title: "pagesTitle.settlements",
        },
        component: () => import("@/views/Dashboard/Financails/SettlementsView.vue"),
        redirect: { path: "/newSettlement" },
        children: [

          /******** New Settlement ********/
          {
            path: "/newSettlement",
            name: "newSettlement",
            meta: {
              title: "pagesTitle.newSettlement",
            },
            component: () =>
            import("@/components/Settlements/NewSettlement.vue"),
          },

          /******** Finshed Settlement ********/
          {
            path: "/finshedSettlement",
            name: "finshedSettlement",
            meta: {
              title: "pagesTitle.finshedSettlement",
            },
            component: () =>
            import("@/components/Settlements/FinshedSettlement.vue"),
          },

          /******** Settlement Detailes ********/
          {
            path: "/settlementDetailes/:id",
            name: "settlementDetailes",
            meta: {
              title: "pagesTitle.settlementDetailes",
            },
            component: () =>
            import("@/views/Dashboard/Financails/SettlementDetailes.vue"),
          },
        ],
      },

      /********************* Reports **********************/
      {
        path: "/reports",
        name: "reports",
        meta: {
          title: "pagesTitle.reports",
        },
        component: () => import("@/views/Dashboard/Reports/ReportsView.vue"),
        redirect: { path: "/orderReports" },
        children: [

          /******** Orders Reports ********/
          {
            path: "/orderReports",
            name: "orderReports",
            component: () => import("@/views/Dashboard/Reports/Tabs/OrderReports.vue"),
          },

          /******** Products Reports ********/
          {
            path: "/productsReports",
            name: "productsReports",
            component: () => import("@/views/Dashboard/Reports/Tabs/ProductsReports.vue"),
          },

          /******** Clients Reports ********/
          {
            path: "/clientsReports",
            name: "clientsReports",
            component: () => import("@/views/Dashboard/Reports/Tabs/ClientsReports.vue"),
          },

          /******** Clients Reports ********/
          {
            path: "/supervisorsReports",
            name: "supervisorsReports",
            component: () => import("@/views/Dashboard/Reports/Tabs/SupervisorsReports.vue"),
          },
        ],
      },

      /********************* Invoices **********************/
      {
        path: "/invoices",
        name: "invoices",
        meta: {
          title: "pagesTitle.invoices",
        },
        component: () => import("@/views/Dashboard/Invoices/InvoicesView.vue"),
      },
      {
        path: "/invoiceDetailes/:id",
        name: "invoiceDetailes",
        meta: {
          title: "pagesTitle.invoiceDetailes",
        },
        component: () =>
          import("@/views/Dashboard/Invoices/InvoiceDetailes.vue"),
      },

      /********************* supervisors **********************/
      {
        path: "/supervisors",
        name: "supervisors",
        meta: {
          title: "pagesTitle.supervisors",
        },
        component: () =>
          import("@/views/Dashboard/Supervisors/SupervisorsView.vue"),
      },
      {
        path: "/addSupervisors",
        name: "addSupervisors",
        meta: {
          title: "pagesTitle.addSupervisors",
        },
        component: () =>
          import("@/views/Dashboard/Supervisors/AddSupervisors.vue"),
      },
      {
        path: "/editSupervisors/:id",
        name: "editSupervisors",
        meta: {
          title: "pagesTitle.editSupervisors",
        },
        component: () =>
          import("@/views/Dashboard/Supervisors/EditSupervisors.vue"),
      },

      /********************* Notifications **********************/
      {
        path: "/notifications",
        name: "notifications",
        meta: {
          title: "pagesTitle.notifications",
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
        },
        component: () => import("@/views//Dashboard/Profile/UserAccount.vue"),
      },
      {
        path: "/change-phone",
        name: "change-phone",
        meta: {
          title: "pagesTitle.changePhone",
        },
        component: () => import("@/views/Dashboard/Profile/ChangePhone.vue"),
      },
      {
        path: "/newPhone",
        name: "newPhone",
        meta: {
          title: "pagesTitle.changePhone",
        },
        component: () => import("@/views/Dashboard/Profile/NewPhone.vue"),
      },
      {
        path: "/code-phone",
        name: "code-phone",
        meta: {
          title: "pagesTitle.verificationCode",
        },
        component: () => import("@/views/Dashboard/Profile/CodePhone.vue"),
      },
      {
        path: "/change-password",
        name: "change-password",
        meta: {
          title: "pagesTitle.changePassword",
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

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//       if (!localStorage.getItem("token")) {
//           next({ name: "login" });
//       } else {
//           next();
//       }
//   } else {
//       next();
//   }
// });

router.afterEach((to) => {
  const titleText = to.meta.title
    ? i18n.global.t(`${to.meta.title}`)
    : "Murouj Dashboard";

  document.title = titleText;

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
});

export default router;

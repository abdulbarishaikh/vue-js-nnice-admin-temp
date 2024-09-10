import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "./Views/Pages/Dashboard.vue";
import Batch from "./Views/Pages/Batch.vue";
import Courses from "./Views/Pages/Courses.vue";

import Main from "./Layout/Main.vue";
import Login from "./Layout/Login.vue";
import { getLocalStorage } from "./Helper";
import { batchReq, courseReq } from "./Config/apiRoutes";
const routes: Array<RouteRecordRaw> = [
    {
        /* {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requiresAuth: false },
    }, */
        path: "/",
        component: Main,
        children: [
            {
                path: "/",
                name: "Dashboard",
                component: Dashboard,
                meta: { requiresAuth: true },
            },
            {
                path: batchReq,
                name: "Batch",
                component: Batch,
                meta: { requiresAuth: true },
            },
            {
                path: courseReq,
                name: "Course",
                component: Courses,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/login",
        component: Login,
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !getLocalStorage('token')) {
        next("/login");
    } else {
        if (getLocalStorage("token") && to.name === "Login") {
            next("/");
        }
        next();
    }
});

export default router;

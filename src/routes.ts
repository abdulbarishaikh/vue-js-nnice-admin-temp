import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "./Views/Pages/Dashboard.vue";
import Batch from "./Views/Pages/Batch.vue";

import Main from "./Layout/Main.vue";
import Login from "./Layout/Login.vue";
import { getLocalStorage } from "./Helper";
import { batchReq } from "./Config/apiRoutes";
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
            }
            /* {
            path: "/category",
            name: "Categories",
            component: Categories,
            meta: { requiresAuth: true },
        },
        {
            path: "/create-category",
            name: "Createcategory",
            component: Createcategory,
            meta: { requiresAuth: true },
        },
        {
            path: "/edit-category/:id",
            name: "EditCategory",
            component: Editcategory,
            meta: { requiresAuth: true },
        },
        {
            path: "/posts",
            name: "PostsList",
            component: PostsList,
            meta: { requiresAuth: true },
        },
        {
            path: "/create-post",
            name: "CreatePost",
            component: CreatePost,
            meta: { requiresAuth: true },
        },
        {
            path: "/edit-post/:id",
            name: "EditPost",
            component: EditPost,
            meta: { requiresAuth: true },
        }, */
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

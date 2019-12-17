import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history', //use browser history
    routes: [
        //Question
        {
            path: "/",
            name: "Home",
            component: () => import("./components/Home")
        },

        //admin
        {
            path: "/admin/questions/:id",
            name: "Admin panel update Question",
            component: () => import("./components/admin/UpdateQuestionComponent")
        },
        {
            path: "/admin/newQuestion",
            name: "Admin panel add Question",
            component: () => import("./components/admin/AddQuestionComponent")
        },
        {
            path: "/admin",
            name: "Admin panel",
            component: () => import("./components/admin/ListQuestionComponent")
        },


        {
            path:"/login",
            component: () => import("./components/Login")
        },

        {
            path:"/about",
            component: () => import("./components/About")
        }
    ]
});

export default router;
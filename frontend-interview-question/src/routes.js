import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history', //use browser history
    routes: [
        //Question
        {
            path: "/",
            name: "Home",
            component: () => import("./components/Home")
        },
        {
            path: "/questions/:id",
            component: () => import("./components/question/QuestionComponent")
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
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
            component: () => import("./components/Wellcome")
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

        //login
        {
            path:"/login",
            component: () => import("./components/Login")
        }
    ]
});

export default router;
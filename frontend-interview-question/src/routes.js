import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history', //use browser history
    routes: [
        //Question routes
        {
            path: "/",
            name: "Home",
            component: () => import("./components/Wellcome")
        },
        {
            path: "/admin/questions",
            name: "Admin panel questions",
            component: () => import("./components/question/AdminListQuestionComponent")
        },
        {
            path: "/admin/questions/:id",
            name: "Admin panel update Question",
            component: () => import("./components/question/UpdateQuestionComponent")
        },
        {
            path: "/admin/newQuestion",
            name: "Admin panel add Question",
            component: () => import("./components/question/AddQuestionComponent")
        },
        {
            path: "/questions/:id",
            component: () => import("./components/question/QuestionComponent")
        }

        //Theme routes
    ]
});

export default router;
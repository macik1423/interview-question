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
            path: "/questions",
            name: "Questions",
            component: () => import("./components/question/ListQuestionComponent")
        },
        {
            path: "/questions/:id",
            name: "Update Question",
            component: () => import("./components/question/UpdateQuestionComponent")
        },
        {
            path: "/newQuestion",
            name: "Add Question",
            component: () => import("./components/question/AddQuestionComponent")
        }

        //Theme routes
    ]
});

export default router;
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history', //use browser history
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("./components/Wellcome")
        },
        {
            path: "/questions",
            name: "Questions",
            component: () => import("./components/ListQuestionComponent")
        },
        {
            path: "/questions/:id",
            name: "Question Details",
            component: () => import("./components/QuestionComponent")
        }
    ]
});

export default router;
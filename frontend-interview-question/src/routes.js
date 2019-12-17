import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store/store';

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
            component: () => import("./components/admin/ListQuestionComponent"),
            meta: {
                requiresAuth: true
            }
        },


        {
            path:"/login",
            component: () => import("./components/auth/Login"),
        },
        {
            path:"/logout",
            component: () => import("./components/auth/Logout")
        },
        {
            path:"/about",
            component: () => import("./components/About")
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if(!store.getters.loggedIn) {
            next({
                name:'login',
            }) 
        } else {
            next()    
        }
    } else if(to.matched.some(record => record.meta.requiresVisitor)) {
        if(store.getters.loggedIn) {
            next({
                name:'admin',
            }) 
        } else {
            next()    
        }
    }else {
        next()
    }
})
export default router;
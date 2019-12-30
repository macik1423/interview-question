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
            component: () => import("./components/Home")
        },

        //admin
        {
            path: "/admin",
            component: () => import("./components/admin/ListQuestionComponent"),
            meta: {
                requiresAdmin: true
            }
        },
        // {
        //     path: "/admin",
        //     component: () => import("./components/admin/AdminComponent"),
        //     meta: {
        //         requiresAdmin: true
        //     }
        // },

        {
            path:"/login",
            component: () => import("./components/auth/Login"),
            meta: {
                requiresLogged: true
            }
        },
        {
            path:"/logout",
            component: () => import("./components/auth/Logout"),
            meta: {
                requiresVisitor: true
            }
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
                path: '/login',
            }) 
        } else {
            next()    
        }
    } else if(to.matched.some(record => record.meta.requiresLogged)) {
        // this route requires logged, check if logged in 
        // if yes, redirect to home page, prevent to open login form
        if(store.getters.loggedIn) {
            next({
                path: '/',
            }) 
        } else {
            next()    
        }
    } else if(to.matched.some(record => record.meta.requiresVisitor)) {
        // this route require visitor, check if logged in 
        // if not, redirect to home page, prevent to open logout page if user not logged
        if(!store.getters.loggedIn) {
            next({
                path: '/',
            }) 
        } else {
            next()    
        }
    } else if(to.matched.some(record => record.meta.requiresAdmin)) {
        // this route require admin, check if logged in 
        // if not, redirect to home page, prevent to open admin page if user not logged
        if(!store.getters.loggedIn) {
            next({
                path: '/login',
            }) 
        } else {
            next()    
        }
    } 
    else {
        next()
    }
    if (to.path === "/" && from.path === "/login"){
        store.state.fromLoginPage = true;
    } else {
        store.state.fromLoginPage = false;
    }
})

export default router;
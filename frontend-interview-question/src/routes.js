import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store/store';
import Home from "./components/Home";
import AdminComponent from "./components/admin/AdminComponent";
import QuestionsOptions from "./components/admin/QuestionsOptions";
import UsersOptions from "./components/admin/UsersOptions";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import About from "./components/About";
import User from "./components/user/UserComponent";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history', //use browser history
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/admin",
            component: AdminComponent,
            meta: {
                requiresAdmin: true
            },
            children : [
                {
                    path:'/questions', 
                    component: QuestionsOptions,
                    meta: {
                        requiresAdmin: true
                    }
                },
                {
                    path:'/users', 
                    component: UsersOptions,
                    meta: {
                        requiresAdmin: true
                    }
                }
            ]
        },
        {
            path:"/login",
            component: Login,
            meta: {
                requiresLogged: true
            }
        },
        {
            path:"/logout",
            component: Logout,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path:"/about",
            component: About
        },
        {
            path:"/account",
            component: User,
            meta: {
                requiresAuth: true
            }
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
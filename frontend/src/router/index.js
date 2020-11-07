import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import Tasks from '../views/Tasks'
import Users from '../views/Users'

import store from '../store/index'

Vue.use(VueRouter)


const routes = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
        beforeEnter: (to, from, next) =>{
            if(store.state.authenticated !== true)
                next({ name: 'Login' });
            else
                next();
        }
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
        beforeEnter: (to, from, next) =>{
            if(store.state.authenticated !== true)
                next({ name: 'Login' });
            else
                next();
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

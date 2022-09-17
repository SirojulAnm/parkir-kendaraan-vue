import { createRouter, createWebHistory } from 'vue-router'
import Home from './../components/Home.vue'
import Login from './../components/Login.vue'
import Plat from './../components/Plat.vue'
import Security from "../components/security.js";
import Report from './../components/Report.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/plat',
        name: 'Plat',
        component: Plat,
    },
    {
        path: '/report',
        name: 'Report',
        component: Report,
    },
]

const router = createRouter({history: createWebHistory(), routes})
router.beforeEach(() => {
    Security.checkToken();
})
export default router
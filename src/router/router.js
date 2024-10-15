import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '../components/RegisterPage.vue';
import ProfilePage from '../components/ProfilePage.vue';
import LoginPage from '../components/LoginPage.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/profile', name: 'Profile', component: ProfilePage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

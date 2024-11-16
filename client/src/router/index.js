// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "../views/LoginView.vue";
const routes = [
    {
        path: '/auth/login',
        name: 'Login',
        component: LoginView, // Компонент для страницы входа
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

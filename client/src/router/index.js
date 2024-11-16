// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "../views/LoginView.vue";
import ChatsView from "../views/ChatsView.vue";
import ChatList from "../views/ChatList.vue";
const routes = [
    {
        path: '/auth/login',
        name: 'Login',
        component: LoginView, // Компонент для страницы входа
    },
    {
        path: '/chats',
        name: 'Chats',
        component: ChatsView, // Компонент для страницы входа
    },
    {
        path: '/chat/list',
        name: 'ChatList',
        component: ChatList, // Компонент для страницы входа
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

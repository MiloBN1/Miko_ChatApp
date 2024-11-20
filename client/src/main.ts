import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createPinia } from 'pinia';

createApp(App).use(router).use(createPinia()).mount('#app')

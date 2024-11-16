<script >
import { io } from "socket.io-client";
import useCookie from "../services/use-cookie.ts";
export default {
  data() {
    return {
      socket: null,
      userId: useCookie.loadCookie('access_token'),
      receiverId: "",
      message: "",
      messages: [],
    };
  },
  methods: {
    // Подключение к серверу Socket.IO
    connectSocket() {
      this.socket = io("http://localhost:3000");

      // Обработка входящих сообщений
      this.socket.on("private_message", ({ senderId, message }) => {
        this.addMessage(`${senderId}: ${message}`);
      });
    },
    // Присоединение пользователя
    joinChat() {
      if (this.userId) {
        this.socket.emit("join", this.userId);
      }
    },
    // Отправка сообщения
    sendMessage() {
      if (this.userId && this.receiverId && this.message) {
        this.socket.emit("private_message", {
          senderId: this.userId,
          receiverId: this.receiverId,
          message: this.message,
        });
        this.addMessage(`Вы: ${this.message}`);
        this.message = "";
      }
    },
    // Добавление сообщения в список
    addMessage(msg) {
      this.messages.push(msg);
    },
  },
  mounted() {
    this.connectSocket();
  },
};
</script>

<template>
    <div>
      <h1>Чат</h1>
      <input v-model="receiverId" placeholder="ID получателя" />
      <input v-model="message" placeholder="Сообщение" />
      <button @click="sendMessage">Отправить</button>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
</template>

<style scoped>

</style>
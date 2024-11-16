<script>
import { io } from "socket.io-client";
import LoginView from "./views/LoginView.vue";
export default {
  data() {
    return {
      socket: null,
      userId: "",
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
<!--  <div>-->
<!--    <h1>Чат</h1>-->
<!--    <input v-model="userId" placeholder="Ваш ID" @change="joinChat" />-->
<!--    <input v-model="receiverId" placeholder="ID получателя" />-->
<!--    <input v-model="message" placeholder="Сообщение" />-->
<!--    <button @click="sendMessage">Отправить</button>-->
<!--    <ul>-->
<!--      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>-->
<!--    </ul>-->
<!--  </div>-->
  <div class="main-content">
    <router-view />
  </div>
</template>

<style scoped>
input {
  display: block;
  margin: 5px 0;
}
button {
  margin: 10px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}

.main-content{
  width: 100%;
}
</style>

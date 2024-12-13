<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue';
import { io, Socket } from 'socket.io-client';
import useCookie from '../../services/use-cookie';
import axios from "axios";
import { useRoomStore } from '../../stores/room.store.ts'; // Подключаем Pinia store

const message = ref<string>('');
const textarea = ref<HTMLTextAreaElement | null>(null);
const socket = ref<Socket | null>(null);
const userId = ref<string | null>(null);
const roomStore = useRoomStore();
let chatHistory = ref<any[]>([]);
// const receiverId = ref<string>('');

// Resize textarea dynamically
function resizeTextarea() {
  if (textarea.value) {
    textarea.value.style.height = 'auto'; // Reset height before calculating
    textarea.value.style.height = `${Math.min(textarea.value.scrollHeight, 300)}px`; // Set height with a max limit of 300px
  }
}

// Connect to the Socket.IO server
function connectSocket() {
  socket.value = io('http://localhost:3000');

  // Handle incoming messages
  socket.value.on('private_message', ({ senderId, message }: { senderId: string, message: string }) => {
    addMessage(`${message}`, senderId);
  });
}

// Join chat (optional for user initialization)
function joinChat() {
  if (userId.value) {
    console.log(userId.value)
    socket.value?.emit('join', userId.value);
  }
}

// Send message to receiver
function sendMessage() {
  if (userId.value && message.value) {
    socket.value?.emit('private_message', {
      roomId: roomStore.currentRoom?.roomId,
      message: message.value,
      token: useCookie.loadCookie('access_token'),
    });
    // addMessage(message.value);
    message.value = '';
  }
}

function getChatHistory(room_id: string) {
  axios.get(`http://localhost:3000/api/room/${room_id}/messages`).then((response) => {
    console.log(response.data);
    chatHistory.value = response.data
  })
}

// Add message to the list
function addMessage(msg: string, sender_id:string) {
  chatHistory.value.push({text: msg, sender_id: sender_id});
}

function getMe(){
  axios.get('http://localhost:3000/api/user/me', {headers:{'Authorization': `Bearer ${useCookie.loadCookie('access_token')}`}}).then((response) => {
    userId.value = response.data.user_id;
    connectSocket();
    joinChat();
  })
}

watch(() => roomStore.currentRoom, (newRoom) => {
  if (newRoom) {
    // Можно загрузить историю сообщений для новой комнаты
    console.log(`Switched to room: ${newRoom.name}`);
    getChatHistory(newRoom.roomId)
  }
});

// Automatically connect socket when mounted
onMounted(() => {
  getMe();
});
</script>


<template>
  <!--    <div>-->
  <!--      <h1>Чат</h1>-->
  <!--      <input v-model="receiverId" placeholder="ID получателя" />-->
  <!--      <input v-model="message" placeholder="Сообщение" />-->
  <!--      <button @click="sendMessage">Отправить</button>-->
  <!--      <ul>-->
  <!--        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>-->
  <!--      </ul>-->
  <!--    </div>-->

  <div class="px-5 relative w-2/3 flex flex-col h-[100vh] pt-16">
    <div class="flex bg-white p-5 absolute left-0 right-0 top-0">
      <img src="/src/assets/img/icons/Google%20-%20Original.svg" alt="asdasd" class="mr-2"/>
      <span class="font-bold">{{ roomStore.currentRoom?.name || '' }}</span>
    </div>
    <!-- История сообщений -->
    <div class="message-history flex-grow overflow-y-auto mt-3" v-if="chatHistory.length > 0">
      <div class="flex mt-3" v-for="(msg, index) in chatHistory" :key="index" :class="msg?.sender_id==userId?'justify-end':'justify-start'">
        <div class="message">
          {{msg.text}}
        </div>
      </div>
    </div>
    <!-- История сообщений -->
    <div class="message-history flex-grow overflow-y-auto mt-3" v-if="chatHistory.length == 0">
      <div class="flex mt-3 justify-center items-center">
        Сообщение пусто
      </div>
    </div>
    <!-- Поле ввода сообщения -->
    <div class="mt-5 flex items-end pb-2">
        <textarea v-model="message"
                  @input="resizeTextarea"
                  ref="textarea"
                  placeholder="Message" class="rounded px-3 py-2 w-full"/>
      <button @click="sendMessage" class="bg-blue-600 text-white send-btn"><i class="bi bi-send-fill"></i></button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none; /* Отключает изменение размера textarea */
  overflow-y: auto; /* Включает вертикальную прокрутку, если содержимое выходит за пределы */
  scrollbar-width: thin; /* Для Firefox, делает scrollbar тонким */
  scrollbar-color: #888 #e0e0e0; /* Для Firefox, устанавливает цвет полосы прокрутки */
}

textarea::-webkit-scrollbar {
  width: 8px; /* Ширина полосы прокрутки для браузеров на базе WebKit */
}

textarea::-webkit-scrollbar-thumb {
  background-color: #888; /* Цвет "ползунка" прокрутки */
  border-radius: 10px; /* Скругление углов */
}

textarea::-webkit-scrollbar-track {
  background-color: #e0e0e0; /* Цвет фона полосы прокрутки */
}

.message{
  max-width: 60%;
  word-break: break-all;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
}
.message-history{
  height: 85vh;
  overflow-y: scroll
}

.message-history::-webkit-scrollbar{
  display: none;
}

.send-btn{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 15px;
}
</style>
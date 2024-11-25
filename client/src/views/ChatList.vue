<script setup lang="ts">
  import ChatBody from "../components/chat-tools/ChatBody.vue";
  import axios from "axios";
  import {onMounted, ref} from "vue";
  import {useRoomStore} from "../stores/room.store.ts";
  import useCookie from "../services/use-cookie.ts";
  const roomStore = useRoomStore();
  let rooms = [
    {
      id:'asdasdadasd',
      name:'Room1',
      lastMessage:'I’ll sing a song with guitar to this girls.',
      image:'cheto.png',
      timestamp:1731755975
    },
    {
      id:'a3333adasd',
      name:'Room2',
      lastMessage:'I’ll sing a song with guitar to this girls.',
      image:'cheto.png',
      timestamp:1731755975
    },
    {
      id:'a2313',
      name:'Room3',
      lastMessage:'I’ll sing a song with guitar to this girls.',
      image:'cheto.png',
      timestamp:1731755975
    }
  ]

  const userId = ref<string | null>(null);
  const currentUser = ref<any>();
  let users = ref<User[] | []>([])

  function formatTimestamp(timestamp:number) {
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    const options = { day: '2-digit', month: 'short', year: 'numeric' }; // Specify the format
    return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for English with MonthName
  }

  function getUsers(){
    axios.get('http://localhost:3000/api/users').then((response) => {
      users.value = response.data;
    })
  }

  function getChats(user_id: string) {
    axios.get(`http://localhost:3000/api/user/${user_id}/chats`).then((response) => {console.log(response.data);})
  }

  function getMe(){
    const token = useCookie.loadCookie('access_token')
    axios.get('http://localhost:3000/api/user/me', {headers:{'Authorization': `Bearer ${token}`}}).then((response) => {
      userId.value = response.data.user_id;
      currentUser.value = response.data;
      getChats(response.data.user_id);
    })
  }

  function selectRoom(room: Room) {
    roomStore.setCurrentRoom({
      roomId: room.roomId,
      name: room.name,
      lastMessage: room.lastMessage,
      timestamp: room.timestamp,
      img: room.img,
    });
    createRoom(room.name, room.roomId)
  }

  function createRoom(room_name:string, receiver_id:string){
    axios.post('http://localhost:3000/api/room/personal/new', {
      user1: userId.value,
      user2: receiver_id,
      user1_name: currentUser.value.username,
      user2_name: room_name,
    }).then((res)=>{
      if(res.data.room_id) roomStore.updateRoom({roomId: res.data.room_id})
    })
  }

  onMounted(() => {
    getMe()
  });
  const commonRoom = {
    roomId: '',
    lastMessage: '',
    timestamp: 0,
    img: ''
  }

  interface User {
    user_id: string;         // UUID пользователя
    username: string;        // Имя пользователя
    email: string;           // Email пользователя
    password: string;        // Хэш пароля
    role: 'user' | 'admin';  // Роль пользователя
    createdAt: string;       // Дата создания (ISO строка)
    updatedAt: string;       // Дата последнего обновления (ISO строка)
  }

  interface Room {
    roomId: string;
    name: string;
    lastMessage: string;
    timestamp: number;
    img: string;
  }
</script>

<template>
  <div class="flex h-[100vh]">
    <!-- Боковая панель с комнатами -->
    <div class="p-5 bg-white w-1/3" style="border-right: 1px solid #d9d9d9">
      <div>
        <form>
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="search" class="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg" placeholder="Search" required />
            <button
                @click="getUsers()"
                type="button" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
      <div v-if="users.length === 0">
        <div class="flex gap-2 py-4 border-b-2 cursor-pointer" v-for="i in rooms" :key="i.id">
          <div class="flex items-center">
            <img src="/src/assets/img/icons/Google%20-%20Original.svg" alt="asdasd"/>
          </div>
          <div>
            <h1 class="font-bold">{{i.name}}</h1>
            <p style="color:#848488;">{{i.lastMessage}}</p>
          </div>
          <div style="color: #AEAEB2;">
            {{formatTimestamp(i.timestamp)}}
          </div>
        </div>
      </div>
      <div v-if="users.length > 0">
        <div class="flex gap-2 py-4 border-b-2 cursor-pointer" v-for="user in users" :key="user.username"
             @click="selectRoom({...commonRoom, name:user.username, roomId:user.user_id})">
          <div class="flex items-center">
            <img src="/src/assets/img/icons/Google%20-%20Original.svg" alt="asdasd"/>
          </div>
          <div>
            <h1 class="font-bold">{{user.username}}</h1>
          </div>
          <div style="color: #AEAEB2;">
          </div>
        </div>
      </div>
    </div>

    <!-- Основная панель с историей сообщений и textarea -->
    <ChatBody/>
  </div>
</template>

<style scoped>

</style>
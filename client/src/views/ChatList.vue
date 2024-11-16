<script setup lang="ts">
  import {ref} from "vue";

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

  let message = ref('')
  const textarea = ref<HTMLTextAreaElement | null>(null);

  function formatTimestamp(timestamp:number) {
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    const options = { day: '2-digit', month: 'short', year: 'numeric' }; // Specify the format
    return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for English with MonthName
  }

  function resizeTextarea() {
    if (textarea.value) {
      textarea.value.style.height = 'auto'; // Reset height before calculating
      textarea.value.style.height = `${Math.min(textarea.value.scrollHeight, 300)}px`; // Set height with a max limit of 400px
    }
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
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
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

    <!-- Основная панель с историей сообщений и textarea -->
    <div class="px-5 relative w-2/3 flex flex-col h-[100vh]">
      <div class="flex bg-white p-5 absolute left-0 right-0">
        <img src="/src/assets/img/icons/Google%20-%20Original.svg" alt="asdasd" class="mr-2"/>
        <span class="font-bold">Room1</span>
      </div>
      <!-- История сообщений -->
      <div class="message-history flex-grow overflow-y-auto mt-3">
        <div class="flex mt-3" v-for="a in [1,2,3,4,5,6,7,8,9,10]" :key="a" :class="a%2==0?'justify-end':'justify-start'">
          <div class="message">
            <!-- Очень длинное сообщение для теста -->
            asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          </div>
        </div>
      </div>

      <!-- Поле ввода сообщения -->
      <div class="mt-5">
        <textarea v-model="message"
                  @input="resizeTextarea"
                  ref="textarea"
                  placeholder="Message" class="rounded px-3 py-2 w-full"/>
      </div>
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
</style>
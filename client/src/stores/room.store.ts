import { defineStore } from 'pinia';

// Интерфейс Room
interface Room {
    roomId: string;
    name: string;
    lastMessage: string;
    timestamp: number;
    img: string;
}

export const useRoomStore = defineStore('roomStore', {
    state: () => ({
        currentRoom: null as Room | null,  // Текущая комната, может быть null
    }),
    actions: {
        setCurrentRoom(room: Room) {
            this.currentRoom = room;
        },
    },
});

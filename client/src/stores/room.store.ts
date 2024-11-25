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

        updateRoom(updatedRoom: Partial<Room>) {
            if (this.currentRoom) {
                // Обновляем только те поля, которые переданы в updatedRoom
                this.currentRoom = { ...this.currentRoom, ...updatedRoom };
            }
        },
    },
});

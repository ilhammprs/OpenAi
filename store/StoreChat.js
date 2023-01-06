import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";

// inisialisasi toko obrolan
export const ChatStore = create(
persist(
(set, get) => ({
// array obrolan default
chats: [],
// loading default false
loading: false,
// simpan obrolan ke API
addChat: async (inputChat) => {
try {
// set loading menjadi true
set(() => ({ loading: true }));
// kirim data input ke API
const { data } = await axios.post("/api/chat", {
chat: inputChat,
});
// data obrolan
const dataChat = {
// input obrolan
chat: inputChat,
// jawaban dari API
answer: data,
// tanggal saat ini
date: new Date(),
};
// set data obrolan baru dari API ke array baru
set((state) => ({
chats: [...state.chats, dataChat],
loading: false,
}));
} catch (err) {
console.log(err);
set(() => ({ loading: false }));
}
},
// hapus satu obrolan
removeOneChat: (item) =>
// hapus satu obrolan berdasarkan indeks
set((state) => ({
chats: state.chats.filter((x) => x !== item),
})),
// hapus semua obrolan
removeAllChat: () => set({ chats: [] }),
}),
// set local storage
{
name: "next-openai-chats",
getStorage: () => localStorage,
}
)
);
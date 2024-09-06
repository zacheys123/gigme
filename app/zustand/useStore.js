import { create } from "zustand";

const useStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
  search: false,
  setSearch: (search) => set({ search }),
}));
export default useStore;

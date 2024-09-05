import { create } from "zustand";

const useStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
}));
export default useStore;

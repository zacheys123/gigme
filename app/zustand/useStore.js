import { create } from "zustand";

const useStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
  search: false,
  setSearch: (search) => set({ search }),
  friendData: false,
  setShowFriendData: (friendData) => set({ friendData }),
  postedGigsData: false,
  setShowPostedGigsData: (postedGigsData) => set({ postedGigsData }),
  bookedGigsData: false,
  setShowBookedGigsData: (bookedGigsData) => set({ bookedGigsData }),
  allGigsData: false,
  setShowAllGigsData: (allGigsData) => set({ allGigsData }),
}));
export default useStore;

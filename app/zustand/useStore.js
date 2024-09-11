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
  friendDataLarge: false,
  setShowFriendDataLarge: (friendDataLarge) => set({ friendDataLarge }),
  postedGigsDataLarge: false,
  setShowPostedGigsDataLarge: (postedGigsDataLarge) =>
    set({ postedGigsDataLarge }),
  bookedGigsDataLarge: false,
  setShowBookedGigsDataLarge: (bookedGigsDataLarge) =>
    set({ bookedGigsDataLarge }),
  allGigsDataLarge: false,
  setShowAllGigsDataLarge: (allGigsDataLarge) => set({ allGigsDataLarge }),
  musiciansLarge: false,
  setShowMusiciansLarge: (musiciansLarge) => set({ musiciansLarge }),

  allGigsLarge: false,
  setShowAllGigsLarge: (allGigsLarge) => set({ allGigsLarge }),
}));
export default useStore;

import { create } from "zustand";

const useStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
  pubGigS: [],
  setPubGigs: (pubGigs) => set({ pubGigs: pubGigs }),
  allGigs: [],
  setAllGigs: (allGigs) => set({ allGigs: allGigs }),
  createdGigs: [],
  setCreatedGigs: (createdGigs) => set({ createdGigs: createdGigs }),
  bookedGigs: [],
  setBookedGigs: (bookedGigs) => set({ bookedGigs: bookedGigs }),
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

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  allGigsLarge: false,
  setShowAllGigsLarge: (allGigsLarge) => set({ allGigsLarge }),
  onlineUsers: [],
  setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
  socket: null,
  setSocket: (socket) => set({ socket }),
  isLoaded: false,
  setIsLoaded: (socket) => set({ socket }),
  name: false,
  setName: (name) => set({ name }),
  // modals
  logout: false,
  setLogout: (logout) => set({ logout }),
  followers: false,
  setFollowers: (followers) => set({ followers }),
  follows: false,
  setFollow: (follows) => set({ follows }),
  videourl: "",
  setUrl: (videourl) => set({ videourl }),
  menu: false,
  setMenu: (menu) => set({ menu }),
  showPosts: false,
  setShowPosts: (showPosts) => set({ showPosts }),
  currentfollowers: false,
  setCurrentFollowers: (currentfollowers) => set({ currentfollowers }),
  // user details
  refetch: false,
  setRefetch: (refetch) => set({ refetch }),
  comm: "",
  setComm: (comm) => set({ comm }),

  open: false,
  setOpen: (open) => set({ open }),

  isbooked: false,
  setIsbooked: (isbooked) => set({ isbooked }),
  // modals

  // user profile
  showComments: false,
  setShowComments: (showComments) => set({ showComments }),

  currentpost: {},
  setCurrentpost: (currentpost) => set({ currentpost }),

  notification: {
    data: { _id: "" },
    message: "",

    createdAt: new Date(),
  },
  setNotification: (notification) => set({ notification }),

  //
  isLoggedOut: false,
  setisLoggedOut: (isLoggedOut) => set({ isLoggedOut }),
}));
export default useStore;

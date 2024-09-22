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

  allGigsLarge: false,
  setShowAllGigsLarge: (allGigsLarge) => set({ allGigsLarge }),
  onlineUsers: [],
  setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
}));
export default useStore;

// import Pusher from 'pusher';

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true
// });

// export default async function handler(req, res) {
//   const { message, username } = req.body;

//   // Trigger the event on Pusher channel
//   await pusher.trigger('chat', 'message', {
//     username,
//     message,
//   });

//   res.status(200).json({ success: true });
// }

// In this API, we trigger the message event on a channel called chat.

// Make sure your Pusher credentials are in your environment variables (.env.local):

// bash

// PUSHER_APP_ID=your_app_id
// PUSHER_KEY=your_key
// PUSHER_SECRET=your_secret
// PUSHER_CLUSTER=your_cluster

// 4. Frontend Pusher Client Setup

// In the frontend, you will use pusher-js to listen for new messages.

// Inside your chat page (e.g., pages/chat.js), you can set up Pusher to subscribe to the chat channel and update the chat in real-time.

// javascript

// // pages/chat.js
// import { useState, useEffect } from 'react';
// import Pusher from 'pusher-js';

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [username, setUsername] = useState(''); // Set username from input

//   useEffect(() => {
//     // Initialize Pusher
//     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
//       cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
//     });

//     // Subscribe to the 'chat' channel
//     const channel = pusher.subscribe('chat');

//     // Bind to 'message' event
//     channel.bind('message', function(data) {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       pusher.unsubscribe('chat');
//     };
//   }, []);

//   const sendMessage = async () => {
//     await fetch('/api/pusher', {
//       method: 'POST',
//       body: JSON.stringify({ message, username }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     setMessage(''); // Clear the input field after sending the message
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         {messages.map((msg, idx) => (
//           <div key={idx}>
//             <strong>{msg.username}: </strong> {msg.message}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// In this code:

//     We use Pusher to subscribe to the chat channel and listen for the message event.
//     The sendMessage function sends a POST request to the API route we created, which broadcasts the message to Pusher.

// 5. Environment Variables for Frontend

// Add the following to .env.local for the frontend:

// bash

// NEXT_PUBLIC_PUSHER_KEY=your_key
// NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster

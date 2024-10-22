// // lib/firebase/firebaseClient.js
// import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage, getToken } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyAQISfcRLzgdejiT0zRbhlN4ufTec1IPeY",
//   authDomain: "nextpush-a1074.firebaseapp.com",
//   projectId: "nextpush-a1074",
//   storageBucket: "nextpush-a1074.appspot.com",
//   messagingSenderId: "414529874488",
//   appId: "1:414529874488:web:f425f767dcf04d3f8394cd",
// };

// let firebaseApp;
// if (typeof window !== "undefined" && !firebaseApp) {
//   firebaseApp = initializeApp(firebaseConfig);
// }

// const messaging = getMessaging(firebaseApp);

// // Request permission to send notifications
// export const requestPermission = async () => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BO_D8NcdavJoh3ljoReDvMmXGmhWpITNeRFzuAYgOGzTCl3XqDvNdFhv0FUgvxe7Utor0CeGfATl20sI3In6d3s",
//     });
//     return token;
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//   }
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

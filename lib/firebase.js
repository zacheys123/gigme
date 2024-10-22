// // lib/firebase.js
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: "gigup-4046a.firebaseapp.com",
//   projectId: "gigup-4046a",
//   storageBucket: "gigup-4046a.appspot.com",
//   messagingSenderId: process.env.SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

// // Initialize Firebase app and messaging
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export async function requestNotificationPermission() {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey: process.env.VAPID_KEY,
//     });
//     if (token) {
//       console.log("FCM token:", token);
//       // Send the token to your server to store it
//       await fetch("/api/save-token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });
//     } else {
//       console.log("No permission to send notifications");
//     }
//   } catch (error) {
//     console.error("Failed to get FCM token:", error);
//   }
// }

// // Handle messages when app is in the foreground
// onMessage(messaging, (payload) => {
//   console.log("Message received: ", payload);
//   alert(payload.notification.title);
// });

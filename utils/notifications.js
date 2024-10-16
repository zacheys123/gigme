// import admin from "firebase-admin";
// import serviceAccount from "../config/serviceWorker.json"; // FCM credentials
// import User from "@/models/user";
// import { useCurrentUser } from "@/hooks/useCurrentUser";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// export const sendFCMNotification = async (userId, title, body) => {
//   try {
//     const user = await User.findById(userId);
//     if (!user?.fcmToken) return;

//     const message = {
//       notification: { title, body },
//       token: user.fcmToken,
//     };

//     await admin.messaging().send(message);
//     console.log(`Notification sent to user ${userId}`);
//   } catch (error) {
//     console.error("Error sending FCM notification:", error);
//   }
// };

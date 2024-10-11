// firebase-messaging-sw.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQISfcRLzgdejiT0zRbhlN4ufTec1IPeY",
  authDomain: "nextpush-a1074.firebaseapp.com",
  projectId: "nextpush-a1074",
  storageBucket: "nextpush-a1074.appspot.com",
  messagingSenderId: "414529874488",
  appId: "1:414529874488:web:f425f767dcf04d3f8394cd",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

import { getApp, initializeApp } from "@react-native-firebase/app";
import {
  getMessaging,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC8oMEHhqJPfGNme0g6O0iEkOnz7FkaEX4",
  authDomain: "auth-yt-58cbe.firebaseapp.com",
  projectId: "auth-yt-58cbe",
  storageBucket: "auth-yt-58cbe.firebasestorage.app",
  messagingSenderId: "444269606457",
  appId: "1:444269606457:web:25a7373fa5634eb75c3fe8",
  measurementId: "G-C1RPD78NZ5",
};

let app;
try {
  app = getApp();
} catch (error) {
  app = initializeApp(firebaseConfig);
}

const messaging = getMessaging(app);

// lắng nghe thông báo khi ứng dụng đang chạy
setBackgroundMessageHandler(messaging, async (remoteMessage) => {
  console.log("Thông báo từ nền", remoteMessage);
});
export { app, messaging };

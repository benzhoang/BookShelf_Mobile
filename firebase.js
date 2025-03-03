import { getApp, initializeApp } from "@react-native-firebase/app";
import {
  getMessaging,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDSphb179A-mKK6V2Dd_RXY9h7QD_niLSE",
  authDomain: "push-745cf.firebaseapp.com",
  projectId: "push-745cf",
  storageBucket: "push-745cf.firebasestorage.app",
  messagingSenderId: "164086794552",
  appId: "1:164086794552:web:e55f8abc5538f3ee1319cd",
  measurementId: "G-Q40R7CFS2Z",
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

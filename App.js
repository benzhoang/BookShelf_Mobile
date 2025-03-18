import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Navigator from "./navigation/Navigator";
import * as Notifications from "expo-notifications";
import {
  getMessaging,
  onMessage,
  getToken,
} from "@react-native-firebase/messaging";
import { app, messaging } from "./firebase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const messaging = getMessaging();
    requestPermissions();
    fetchFCMToken();
    //  Lắng nghe thông báo khi ứng dụng đang chạy
    const unsubscribe = onMessage(messaging, async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification?.title || "Thông báo",
        remoteMessage.notification?.body || "Không có nội dung"
      );
    });
    return unsubscribe;
  }, []);

  // Yêu cầu quyền gửi thông báo
  async function requestPermissions() {
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Cần quyền truy cập thông báo để nhận tin nhắn.");
    }
  }
  //  Lấy FCM Token
  async function fetchFCMToken() {
    const messaging = getMessaging();
    try {
      const fcmToken = await getToken(messaging);
      if (fcmToken) {
        setToken(fcmToken);
        console.log("FCM Token:", fcmToken);
      } else {
        console.log("Không tìm thấy FCM Token!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy FCM Token:", error);
    }
  }
  return <Navigator />;
}

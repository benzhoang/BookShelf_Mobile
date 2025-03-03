import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./Register/RegisterScreen";
import Login from "./Login/LoginScreen";
import HomeScreen from "./Home/HomePage";
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

const Stack = createStackNavigator();

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Begin" options={{ headerShown: false }}>
          {(props) => <BeginScreen {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BeginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/Login Wallpaper.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Choose your BookShelf</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#222",
  },
  imageContainer: {
    flex: 4,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 2,
    backgroundColor: "#C4A484",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

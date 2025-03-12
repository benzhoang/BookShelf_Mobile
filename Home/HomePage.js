import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
export default function HomeScreen() {
  const [user, setUser] = useState("USER");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await GoogleSignin.getCurrentUser();
        if (userInfo) {
          setUser(userInfo.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  const [image, setImage] = useState(
    "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
  );

  const carouselItems = [
    {
      title: "Featured Book 1",
      image: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
    },
    {
      title: "Featured Book 2",
      image: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
    },
    {
      title: "Featured Book 3",
      image: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#C4A484", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>
          Xin chào {user.name} 🌿
        </Text>
        <Image
          source={{ uri: user.photo }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 10,
          color: "#fff",
        }}
      >
        Relax and read book
      </Text>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <FontAwesome
          name="search"
          size={20}
          color="#000"
          style={{ marginRight: 10 }}
        />
        <TextInput placeholder="Search book" style={{ flex: 1 }} />
      </View>

      <View style={{ height: 200, marginBottom: 20 }}>
        <Swiper
          style={{}}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          showsPagination={true}
          dotStyle={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          activeDotStyle={{ backgroundColor: "#fff" }}
        >
          {carouselItems.map((item, index) => (
            <View key={index} style={{ flex: 1 }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
              <Text
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
}

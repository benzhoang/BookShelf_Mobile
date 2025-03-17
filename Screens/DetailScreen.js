import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Install this package
import AsyncStorage from "@react-native-async-storage/async-storage";

// API URL from environment variable
const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://bookshelf-be.onrender.com";

function DetailScreen({ route, navigation }) {
  const { bookID } = route.params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status

  // Check favorite status when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        const favoritesArray = favorites ? JSON.parse(favorites) : [];
        setIsFavorite(favoritesArray.includes(bookID));
      } catch (err) {
        console.error("Error checking favorite status:", err);
      }
    };

    checkFavoriteStatus();
  }, [bookID]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log(route);
        const response = await fetch(`${API_URL}/api/books/${bookID}`);
        const data = await response.json();
        console.log("Book Details Response:", data);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin sách");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookID]);

  // Updated toggleFavorite function
  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        // Remove from favorites
        favoritesArray = favoritesArray.filter((id) => id !== bookID);
        console.log("Removed from favorites");
      } else {
        // Add to favorites
        favoritesArray.push(bookID);
        console.log("Added to favorites");
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Image Container with Star Icon */}
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Icon
              name={isFavorite ? "star" : "star-o"} // Filled star when favorite, outline when not
              size={30}
              color={isFavorite ? "gold" : "#5A4032"}
            />
          </TouchableOpacity>
          {Array.isArray(book.image) && book.image.length > 0 ? (
            <Image
              source={{ uri: book.image[0] }}
              style={styles.bookImage}
              onError={(e) => console.log("Image load error:", e)}
            />
          ) : typeof book.image === "string" && book.image.trim() ? (
            <Image
              source={{ uri: book.image }}
              style={styles.bookImage}
              onError={(e) => console.log("Image load error:", e)}
            />
          ) : (
            <Image
              source={require("../assets/loi-404-tren-cyber-panel.jpg")}
              style={styles.bookImage}
            />
          )}
        </View>

        {/* Book Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>{book.bookName}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Tác giả: </Text>
            <Text style={styles.value}>
              {book.actorID?.actorName
                ? book.actorID.actorName
                : "Chưa xác định"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Danh mục: </Text>
            <Text style={styles.value}>
              {book.categoryID ? book.categoryID.categoryName : "Không có"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Mô tả: </Text>
            <Text style={styles.description}>{book.description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E8C7",
  },
  content: {
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5E8C7",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#8F6B4A",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  bookImage: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    resizeMode: "contain",
  },
  detailsCard: {
    backgroundColor: "#FFF8E7",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A4032",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "System",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 18,
    color: "#7A5D3F",
    fontWeight: "600",
    width: 100,
    fontFamily: "System",
  },
  value: {
    fontSize: 18,
    color: "#3D2B1F",
    flex: 1,
    fontFamily: "System",
  },
  description: {
    fontSize: 16,
    color: "#3D2B1F",
    lineHeight: 24,
    flex: 1,
    fontFamily: "System",
  },
  loadingText: {
    fontSize: 18,
    color: "#5A4032",
    marginTop: 10,
    fontFamily: "System",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    fontFamily: "System",
  },
  favoriteButton: {
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 1, // Ensure it stays above the image
  },
});

export default DetailScreen;

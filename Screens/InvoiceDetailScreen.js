import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function InvoiceDetailScreen({ route, navigation }) {
    const { book } = route.params;

    // Parse book data safely
    const parsedBook = React.useMemo(() => {
        try {
            return typeof book === "string" && book.trim().startsWith("{")
                ? JSON.parse(book)
                : book;
        } catch (e) {
            console.error("Error parsing book data:", e);
            return book; // Fallback to original value
        }
    }, [book]);

    // Helper function to get image source
    const getImageSource = () => {
        if (Array.isArray(parsedBook.image) && parsedBook.image.length > 0) {
            return { uri: parsedBook.image[0] };
        }
        if (typeof parsedBook.image === "string" && parsedBook.image.trim()) {
            return { uri: parsedBook.image };
        }
        return require("../assets/loi-404-tren-cyber-panel.jpg");
    };

    // Format price helper
    const formatPrice = (price) => {
        return parseFloat(price || 0).toLocaleString("vi-VN") + " VND";
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={getImageSource()}
                        style={styles.bookImage}
                        defaultSource={require("../assets/loi-404-tren-cyber-panel.jpg")}
                    />
                </View>

                <View style={styles.detailsCard}>
                    <Text style={styles.bookTitle}>{parsedBook.name || "Unknown Title"}</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Author:</Text>
                        <Text style={styles.value}>
                            {parsedBook.author || "N/A"}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Quantity:</Text>
                        <Text style={styles.value}>1</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Price:</Text>
                        <Text style={styles.value}>{formatPrice(parsedBook.price)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>{formatPrice(parsedBook.price)}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => console.log("Purchase confirmed", parsedBook)}
                >
                    <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
                </TouchableOpacity>
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
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    bookImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
        resizeMode: "contain",
    },
    detailsCard: {
        backgroundColor: "#FFF8E7",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#5A4032",
        marginBottom: 15,
        textAlign: "center",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: "#7A5D3F",
        fontWeight: "600",
    },
    value: {
        fontSize: 18,
        color: "#3D2B1F",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#8F6B4A",
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5A4032",
    },
    totalValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5A4032",
    },
    confirmButton: {
        backgroundColor: "#8F6B4A",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
    },
    confirmButtonText: {
        fontSize: 18,
        color: "#FFF8E7",
        fontWeight: "600",
    },
});

export default InvoiceDetailScreen;
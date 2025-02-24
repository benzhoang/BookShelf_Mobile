import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-camera';

export default function QRScreen() {
    const [hasPermission, setHasPermission] = useState(null); // Trạng thái quyền truy cập camera
    const [scanned, setScanned] = useState(false); // Trạng thái đã quét mã QR hay chưa

    // Yêu cầu quyền truy cập camera khi component được mount
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Xử lý khi quét được mã QR
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert(
            'QR Code Scanned',
            `Type: ${type}\nData: ${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }] // Reset để quét lại
        );
    };

    // Kiểm tra trạng thái quyền truy cập camera
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting camera permission...</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera. Please allow camera permission in settings.</Text>
            </View>
        );
    }

    // Giao diện chính với camera quét QR
    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Chỉ quét khi chưa scanned
                style={StyleSheet.absoluteFillObject} // Chiếm toàn bộ màn hình
            />
            {scanned && (
                <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
            )}
            <Text style={styles.instruction}>Point your camera at a QR code</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Nền đen để camera nổi bật
    },
    instruction: {
        position: 'absolute',
        bottom: 50,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
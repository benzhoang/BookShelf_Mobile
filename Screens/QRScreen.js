import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';

export default function QRScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [camera, setCamera] = useState(null); // Tham chiếu đến camera

    // Yêu cầu quyền truy cập camera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissions();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Xử lý khi quét được mã (QR hoặc barcode)
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert(
            'Mã Đã Quét',
            `Loại: ${type}\nDữ liệu: ${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
        );
    };

    // Trạng thái khi đang yêu cầu quyền
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Đang yêu cầu quyền truy cập camera...</Text>
            </View>
        );
    }

    // Trạng thái khi quyền bị từ chối
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Không có quyền truy cập camera. Vui lòng cấp quyền trong cài đặt.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: [
                        Camera.Constants.BarCodeType.qr,      // Quét mã QR
                        Camera.Constants.BarCodeType.ean13,   // Quét barcode EAN-13
                        Camera.Constants.BarCodeType.code128, // Quét barcode Code-128
                    ],
                }}
                ref={(ref) => setCamera(ref)}
            />
            {scanned && (
                <Button title="Quét lại" onPress={() => setScanned(false)} />
            )}
            <Text style={styles.instruction}>Hướng camera vào mã QR hoặc barcode</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    instruction: {
        position: 'absolute',
        bottom: 50,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
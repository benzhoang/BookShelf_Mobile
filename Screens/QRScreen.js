import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function QRScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    // Yêu cầu quyền truy cập camera
    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Yêu cầu quyền camera',
                        message: 'Ứng dụng cần quyền truy cập camera để quét mã QR.',
                        buttonPositive: 'Đồng ý',
                        buttonNegative: 'Từ chối',
                    }
                );
                setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                // iOS sẽ tự động yêu cầu quyền khi camera khởi động
                setHasPermission(true); // Giả định tạm thời, có thể kiểm tra thêm nếu cần
            }
        })();
    }, []);

    // Xử lý khi quét được mã QR
    const handleBarCodeScanned = ({ barcodes }) => {
        if (barcodes.length > 0) {
            setScanned(true);
            const { type, data } = barcodes[0];
            Alert.alert(
                'QR Code Scanned',
                `Type: ${type}\nData: ${data}`,
                [{ text: 'OK', onPress: () => setScanned(false) }]
            );
        }
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Đang yêu cầu quyền truy cập camera...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Không có quyền truy cập camera. Vui lòng cấp quyền trong cài đặt.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RNCamera
                style={StyleSheet.absoluteFillObject}
                onBarCodeRead={scanned ? undefined : handleBarCodeScanned} // Chỉ quét khi chưa scanned
                captureAudio={false} // Tắt âm thanh để tránh lỗi quyền micro
            />
            {scanned && (
                <Button title="Quét lại" onPress={() => setScanned(false)} />
            )}
            <Text style={styles.instruction}>Hướng camera vào mã QR</Text>
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
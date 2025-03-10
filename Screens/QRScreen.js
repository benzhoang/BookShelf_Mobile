import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function QRScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation(); // Hook để điều hướng

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to use the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        if (scanned) return; // Ngăn không cho quét thêm khi đã quét thành công
        setScanned(true); // Tạm dừng quét

        // Chuyển hướng đến màn hình khác, ví dụ: 'ResultScreen', và gửi dữ liệu QR
        navigation.navigate('ResultScreen', { qrData: data });

        // Đặt lại trạng thái scanned sau 1 giây để cho phép quét lại nếu quay lại màn hình này
        setTimeout(() => setScanned(false), 1000);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Tắt quét khi scanned = true
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            >
                <View style={styles.overlay}>
                    <View style={styles.scanBox} />
                    <Text style={styles.instruction}>Align the QR code within the box</Text>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    message: { textAlign: 'center', paddingBottom: 10 },
    camera: { flex: 1 },
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scanBox: {
        width: 250,
        height: 250,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
    },
    instruction: {
        marginTop: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
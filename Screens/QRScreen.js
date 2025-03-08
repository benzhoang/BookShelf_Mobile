import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function QRScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

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
        if (scanned) return;
        setScanned(true);
        Alert.alert('QR Code Scanned', `Data: ${data}`, [
            { text: 'OK', onPress: () => setTimeout(() => setScanned(false), 1000) },
        ]);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
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

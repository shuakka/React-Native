import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { Camera } from "expo-camera";
import Header from "../components/Header";

const ScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.reset({
            index: 0,
            routes: [{ name: 'WorkerDashboard' }],
        });
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Header title="Check-In" />
            <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setScanned(false)}
            >
                <Text style={styles.buttonText}>Scan QR to Start your job</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    button: {
        backgroundColor: "#1a80e6",
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
    },
});

export default ScannerScreen;

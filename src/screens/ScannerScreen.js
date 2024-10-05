import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";

export default function ScannerScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminDashboard' }],
      })
    };
  
    const onBackPressed = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminDashboard' }],
        })
      }
    const renderCamera = () => {
      return (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />
        </View>
      );
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Camera permission not granted</Text>
        </View>
      );
    }
  
    return (
        <><View style={styles.headerContainer}>
            <Button onPress={onBackPressed} icon={require('../assets/arrow_back.png')} />
            <Header title="Attendance List" />
        </View><View style={styles.container}>
                <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
                {renderCamera()}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleBarCodeScanned}
                >
                    <Text style={styles.buttonText}>Scan QR to Start your job</Text>
                </TouchableOpacity>
            </View></>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop:20,
        marginBottom:10,
        backgroundColor: '#fff',
       
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 40,
    },
    cameraContainer: {
      width: '80%',
      aspectRatio: 1,
      overflow: 'hidden',
      borderRadius: 10,
      marginBottom: 40,
    },
    camera: {
      flex: 1,
    },
    button: {
      backgroundColor: 'blue',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
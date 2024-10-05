import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library
import { LineChart } from 'react-native-chart-kit'; // For the chart
import { BarCodeScanner } from 'expo-barcode-scanner'; // Barcode scanner
import Toast from 'react-native-toast-message'; // Toast message for feedback
import {checkinAPI,checkoutAPI} from '../../service/WorkerService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkerDashboard({ navigation }) {
  const [status, setStatus] = useState(''); // Check-in/check-out status
  const [token, setToken] = useState('');
  const [id, setId] = useState(Number);
  const [checkInID, setCheckInID] = useState(Number);
  const [hasPermission, setHasPermission] = useState(null); // Camera permission state
  const [scanned, setScanned] = useState(false); // Scanned state
  const [cameraActive, setCameraActive] = useState(false); // Control camera

  useEffect(() => {
    // Request camera permission
       const getSessionData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          console.log(value,'----value')
          setToken(value);
        }
      } catch (e) {
        console.log(e,'----error')
        console.error('Failed to fetch session data', e);
      }
    };
    getSessionData();
    const getIDSessionData = async () => {
      try {
        const value = await AsyncStorage.getItem('id');
        if (value !== null) {
          setId(value);
        }
      } catch (e) {
        console.error('Failed to fetch session data', e);
      }
    };
    getIDSessionData();
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  
  
    getBarCodeScannerPermissions();
  }, []);

  const getCheckinIDSessionData = async () => {
    try {
      const value = await AsyncStorage.getItem('checkInID');
      if (value !== null) {
        setCheckInID(value);
      }
    } catch (e) {
      console.error('Failed to fetch session data', e);
    }
  };
  const oncheckinPressed = async () => {
    console.log("pressed this butn")
    checkin();

  };
  
  const oncheckoutPressed = async () => {
    console.log("oncheckoutPressed")
    if (status === 'checkedIn') {
      setStatus('checkedOut');
    }
    getCheckinIDSessionData();
    if(setCheckInID!=''){
      checkout();
    }

  };
  const handleCheckInID = async (data) => {
    console.log(data,"Token checkin id")
    try {
      await AsyncStorage.setItem('checkInID', data);
    } catch (e) {
      console.error('Failed to save session data', e);
    }
  };
  const checkin = async () => {
    console.log("token33",token,'--',id)
    try {
      const response = await checkinAPI(token,id);
      console.log("resposne---",response)
      if(response.data.status===200){
        Toast.show({
          type: 'success',
          text1: 'Check-in Successful',
          text2: 'Welcome to work! ✅',
        });
        console.log("response.data.status.response.id",response.data.status.response.id)
        if(response.data.status.response.id && response.data.status.response.id!=''){
          handleCheckInID(response.data.status.response.id);
          setCheckInID(response.data.status.response.id)
        }
      }
      else{
        Toast.show({
          type: 'error',
          text1: 'Check-in with valid data',
          text2: 'Error',
        });
        // showErrorMessage()
      }

    } catch (error) {
      // showErrorMessage()
      Toast.show({
        type: 'error',
        text1: 'Check-in with valid data',
        text2: 'Error',
      });
      console.error('Error fetching data:', error);
    }
  };
  const checkout = async () => {
    console.log("token33 checkedout",token,'--',checkInID)
    try {
      const response = await checkoutAPI(token,checkInID);
      console.log("resposne---",response)
      if(response.data.status===200){
        Toast.show({
          type: 'success',
          text1: 'Check-out Successful',
          text2: 'Marked Done! ✅',
        });
      }
      else{
        Toast.show({
          type: 'error',
          text1: 'Check-out unsuccessfull',
          text2: 'Error',
        });
        // showErrorMessage()
      }

    } catch (error) {
      // showErrorMessage()
      Toast.show({
        type: 'error',
        text1: 'Check-in with valid data',
        text2: 'Error',
      });
      console.error('Error fetching data:', error);
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCameraActive(false); // Turn off the camera after scanning

    // Simulate validation of scanned data
    if (data === 'EXPECTED_BARCODE_DATA') {
   
      console.log(data,"data of barcode--")
      oncheckinPressed();
      setStatus('checkedIn'); // Set status to checked in after successful scan
     
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid barcode! ❌',
      });
    }
  };

  const handleCheckIn = () => {
    if (status === '' && !scanned) {
      // Activate the camera when check-in is pressed
      setCameraActive(true);
    } else if (status === 'checkedIn') {
      setStatus('checkedOut');
    }
  };

  // Mock chart data for attendance
  const attendanceData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        data: [90, 95, 85, 88, 100],
        color: () => `rgba(0, 123, 255, 1)`, // Blue color
        strokeWidth: 2,
      },
    ],
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
console.log("token",token,'--',id);
  return (
    <View style={styles.container}>
      {/* Attendance info and chart section */}
      <View style={styles.attendanceCard}>
        <Text style={styles.attendanceText}>Attendance</Text>
        <Text style={styles.attendancePercentage}>100%</Text>
        <Text style={styles.attendanceSubtitle}>Last 5 Months <Text style={styles.attendanceSubtitle_1}>-1%</Text></Text>

        {/* Line chart for attendance */}
        <LineChart
          data={attendanceData}
          width={Dimensions.get('window').width - 80} // Chart width (full width minus some padding)
          height={220}
          chartConfig={{
            backgroundColor: '#0F1A24',
            backgroundGradientFrom: '#0F1A24',
            backgroundGradientTo: '#0F1A24',
            decimalPlaces: 0, // No decimal places
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => `rgba(255, 255, 255, 0.7)`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#007bff',
            },
          }}
          bezier // Makes the line smooth
          style={styles.chart}
        />
      </View>

      {/* Conditional Button Logic */}
      <View style={styles.buttonContainer}>
        {status === '' && (
          <Button title="Check-in" onPress={handleCheckIn} color="#007bff" />
        )}
        {status === 'checkedIn' && (
          <Button title="Check-out" onPress={oncheckoutPressed} color="#007bff" />
        )}
        {status === 'checkedOut' && (
          <Button title="Marked Done" disabled={true} color="#808080" />
        )}
      </View>

      {/* Conditionally render Barcode scanner */}
      {cameraActive && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject }
        />
      )}

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('WorkerDashboard')}>
          <FontAwesome name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WorkerAttendance')}>
          <FontAwesome name="calendar" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WorkerProfile')}>
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Toast notification */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1A24',
    padding: 20,
    paddingTop: 70,
  },
  attendanceCard: {
    backgroundColor: '#0F1A24',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor:'#2c425c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  attendanceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attendancePercentage: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  attendanceSubtitle: {
    color: '#6e7c8e',
    fontSize: 14,
  },
  attendanceSubtitle_1:{
    color: '#9a4829',
    fontSize: 14,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
    left:-10
  },
  buttonContainer: {
    marginVertical: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121212',
    paddingVertical: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library
import { LineChart } from 'react-native-chart-kit'; // For the chart
import { BarCodeScanner } from 'expo-barcode-scanner'; // Barcode scanner
import Toast from 'react-native-toast-message'; // Toast message for feedback

export default function WorkerDashboard({ navigation }) {
  const [status, setStatus] = useState(''); // Check-in/check-out status
  const [hasPermission, setHasPermission] = useState(null); // Camera permission state
  const [scanned, setScanned] = useState(false); // Scanned state

  useEffect(() => {
    // Request camera permission
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Simulate validation of scanned data
    if (data === 'EXPECTED_BARCODE_DATA') {
      Toast.show({
        type: 'success',
        text1: 'Check-in Successful',
        text2: 'Welcome to work! ✅',
      });
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
      // Barcode scanning logic
      setScanned(false);
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

  return (
    <View style={styles.container}>
      {/* Attendance info and chart section */}
      <View style={styles.attendanceCard}>
        <Text style={styles.attendanceText}>Attendance</Text>
        <Text style={styles.attendancePercentage}>100%</Text>
        <Text style={styles.attendanceSubtitle}>Last 5 Months -1%</Text>

        {/* Line chart for attendance */}
        <LineChart
          data={attendanceData}
          width={Dimensions.get('window').width - 40} // Chart width (full width minus some padding)
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
          <Button title="Check-out" onPress={handleCheckIn} color="#007bff" />
        )}
        {status === 'checkedOut' && (
          <Button title="Marked Done" disabled={true} color="#808080" />
        )}
      </View>

      {/* Barcode scanner */}
      {!scanned && status === '' && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
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
    paddingTop:70
  },
  attendanceCard: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
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
    color: '#FF0000',
    fontSize: 14,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
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

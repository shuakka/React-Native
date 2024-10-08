import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library
import { LineChart } from 'react-native-chart-kit'; // For the chart
import Toast from 'react-native-toast-message'; // Toast message for feedback

export default function WorkerDashboard({ navigation }) {
  const [status, setStatus] = useState(''); // Check-in/check-out status

  const handleCheckIn = () => {
    if (status === '') {
      // Navigate to the ScannerScreen on Check-in
      navigation.navigate('ScannerScreen');
    } else if (status === 'checkedIn') {
      setStatus('checkedOut');
      Toast.show({
        type: 'success',
        text1: 'Check-out Successful',
        text2: 'Goodbye! 👋',
      });
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Attendance info and chart section */}
      <View style={styles.attendanceCard}>
        <Text style={styles.attendanceText}>Attendance</Text>
        <Text style={styles.attendancePercentage}>100%</Text>
        <Text style={styles.attendanceSubtitle}>Last 5 Months -1%</Text>

        {/* Wrap LineChart in TouchableOpacity */}
        <TouchableOpacity onPress={() => navigation.navigate('WorkerAttendance')}>
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
        </TouchableOpacity>
      </View>

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

      {/* Floating Action Button for Check-in/Check-out */}
      <TouchableOpacity style={styles.fab} onPress={handleCheckIn}>
        <FontAwesome name={status === 'checkedIn' ? 'sign-out' : 'sign-in'} size={24} color="white" />
      </TouchableOpacity>

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
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  attendanceCard: {
    backgroundColor: '#0F1A24',
    padding: 10,
    borderRadius: 0,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    alignItems: 'center',
    height: 500,
  },
  attendanceText: {
    color: '#F2EDED',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attendancePercentage: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  attendanceSubtitle: {
    color: '#FF0000',
    fontSize: 14,
  },
  chart: {
    marginTop: 50,
    marginVertical: 10,
    borderRadius: 16,
    height: 300,
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
  fab: {
    position: 'absolute',
    bottom: 80, // Adjust the distance from the bottom
    right: 20,  // Adjust the distance from the right
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 15,
    elevation: 5, // Shadow for Android
  },
});

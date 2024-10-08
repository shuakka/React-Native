import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage

export default function WorkerAttendance({ navigation }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(''); 

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

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Retrieve the token from AsyncStorage
        const response = await fetch('http://13.50.183.255:9003/user-service/attendance/getAttendanceHistory', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }

        const data = await response.json();
        console.log(data); // Log the entire response for debugging
        if (Array.isArray(data.response)) {
          setAttendanceData(data.response); // Set the data if it's an array
        } else {
          throw new Error('Unexpected response format'); // Handle unexpected format
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    

    fetchAttendanceData();
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />; // Show loading indicator
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>; // Show error message
  }

  if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
    return <Text style={styles.errorText}>No attendance data available</Text>; // Handle no data
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance</Text>
      <ScrollView>
        {attendanceData.map((item) => (
          <View key={item.id} style={styles.attendanceItem}>
            <View style={styles.checkContainer}>
                <FontAwesome name="check-square" size={24} color="white" style={styles.checkIcon} />
                <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <View>
              <Text style={styles.timeText}>
                {`Check In: ${new Date(item.checkIn).toLocaleTimeString()} | Check Out: ${new Date(item.checkOut).toLocaleTimeString()}`}
              </Text>
              <Text style={styles.totalHoursText}>{`Total Hours: ${item.totalHours} hours`}</Text>
              <Text style={styles.remarksText}>{`Remarks: ${item.remarks}`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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

      <TouchableOpacity style={styles.fab} onPress={handleCheckIn}>
        <FontAwesome name={status === 'checkedIn' ? 'sign-out' : 'sign-in'} size={24} color="white" />
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  attendanceItem: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#172736',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkIcon: {
    marginBottom: 5,
  },
  dateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#cccccc',
    fontSize: 14,
  },
  totalHoursText: {
    color: '#cccccc',
    fontSize: 14,
  },
  remarksText: {
    color: '#cccccc',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
  checkContainer: {
    flexDirection: 'row',       // Align icon and text in a row
    alignItems: 'left',       // Center vertically
    justifyContent: 'left',   // Center horizontally
  },
  checkIcon: {
    marginRight: 8,             // Space between icon and text
  },
  dateText: {
    color: 'white',              // Change text color to white
    fontSize: 16,                // Adjust font size as needed
    fontWeight: 'bold',          // Make text bold if needed
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

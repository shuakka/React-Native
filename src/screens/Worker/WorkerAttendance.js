// WorkerAttendance.js
import React ,{useEffect,useState}from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library
import {attendanceHistoryAPI} from '../../service/WorkerService';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WorkerAttendance({navigation}) {

  const [attendanceList, setAttendanceList] = useState([]);
  useEffect(() => {
    const getTokenSessionData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          onattendancePressed(value)
        }
      } catch (e) {
        console.error('Failed to fetch session data', e);
      }
    };
   ;
   getTokenSessionData();
  });
  const onattendancePressed = async (token) => {
    attendanceAPI(token)
  }
  const attendanceAPI = async (token) => {
    console.log("token33",token,'--')
    try {
      const response = await attendanceHistoryAPI(token);
      console.log("resposne---",response)
      if(response.data.status===200){
 
        console.log("Attendence List-----",response.data)
        setAttendanceList(response.data.response)
     
      }
      else{
        // Toast.show({
        //   type: 'error',
        //   text1: 'Check-in with valid data',
        //   text2: 'Error',
        // });
        // showErrorMessage()
      }

    } catch (error) {
      // showErrorMessage()
      // Toast.show({
      //   type: 'error',
      //   text1: 'Check-in with valid data',
      //   text2: 'Error',
      // });
      console.error('Error fetching data:', error);
    }
  };

  // Sample attendance data
  const attendanceData = [
    { date: 'Yesterday', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 14', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 13', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 12', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 11', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 14', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 13', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 12', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 11', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 14', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 13', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 12', time: 'Arrived at 9:00 AM, left at 5:00 PM' },
    { date: 'Dec 11', time: 'Arrived at 9:00 AM, left at 5:00 PM' },

  ];
// Function to format the date into "Sept 1" format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' }; // Format: Sept 1
  return date.toLocaleDateString('en-US', options);
};

// Function to extract time in "HH:MM" format
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0'); // Add leading 0 if necessary
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.header}>Attendance</Text>

      <ScrollView>
        {attendanceList.map((item, index) => (
  
          <View key={index} style={styles.attendanceItem}>
            <FontAwesome name="check-square" size={24} color="white" style={styles.checkIcon} />
            <View>
              <Text style={styles.dateText}>{formatDate(item.checkIn)}</Text>
              <Text style={styles.timeText}>Arrived at {formatTime(item.checkIn)} ,left at {formatTime(item.checkOut)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 15,
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
  }
});

// WorkerAttendance.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon library

export default function WorkerAttendance({navigation}) {
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

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.header}>Attendance</Text>

      <ScrollView>
        {attendanceData.map((item, index) => (
          <View key={index} style={styles.attendanceItem}>
            <FontAwesome name="check-square" size={24} color="white" style={styles.checkIcon} />
            <View>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
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

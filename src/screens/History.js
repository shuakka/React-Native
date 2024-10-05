import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import { Button, Icon,DataTable } from 'react-native-paper';

// Sample Data
const activityData = [
  { id: '1', startTime: '09-20 08:00 AM',  activityLog: 'Logged In' },
  { id: '2', startTime: '09-20 09:30 AM',  activityLog: 'Updated Profile' },
  { id: '3', startTime: '09-20 11:00 AM',  activityLog: ' Review Dash' },
  { id: '4', startTime: '09-20 12:30 PM',  activityLog: ' Exported Data' },
  { id: '5', startTime: '09-20 02:00 PM',  activityLog: 'Logged Out' }
];

// Home Screen: Display Table
const History = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <DataTable.Row> 
      <DataTable.Cell>{item.id}</DataTable.Cell> 
      <DataTable.Cell>{item.startTime}</DataTable.Cell> 


      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Timeline', { activity: item })}>
        {/* <Text style={[styles.cell, styles.link]}>{item.activityLog}</Text> */}
        <DataTable.Cell style={styles.cell}>
    <Text style={styles.link}>{item.activityLog}</Text> 
  </DataTable.Cell>
      </TouchableOpacity>
    </DataTable.Row>
  );
  const onBackPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminDashboard' }],
    })
  }

  return (
    <>
    <View style={styles.headerContainer}>
    <Button onPress={onBackPressed}  icon={require('../assets/arrow_back.png')}/>
      <Header title="Attendance List" />
    </View>
    <DataTable style={styles.container}> 
      
      {/* Table Header */}
      <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title>Serial No</DataTable.Title> 
        <DataTable.Title>Start Time</DataTable.Title> 
        <DataTable.Title>Activity Log</DataTable.Title> 
      </DataTable.Header>


      {/* Table Rows */}
      <FlatList
        data={activityData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </DataTable>
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 15, 
  }, 
  tableHeader: { 
    backgroundColor: '#DCDCDC', 
  }, 
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop:20,
    marginBottom:10,
    backgroundColor: '#fff',
   
  },
  container: {
    flex: 1, // Allow table to expand if needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor:   
 '#ddd', // Optional: Add a subtle border
    backgroundColor: '#f2f2f2', // Optional: Light background for header
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor:   
 '#ddd', // Optional: Add borders to rows
  },
  cell: {
    justifyContent: 'center',
  },
  link: {
    color: 'blue',  // This changes the text color to blue
    // textDecorationLine: 'underline',  // Optional: to make it look like a clickable link
  },
  detailsContainer: {
    padding: 20,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default History;
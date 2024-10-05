import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import {Picker } from '@react-native-picker/picker'

const data = [
  {
    id: '1',
    name: 'Shubham',
    jobRole: 'Worker level 1',
    deptName: 'Finance',
    inTime: '7:00 AM',
    outTime: '3:00 PM',
    totalHours: '8 Hr',
  },
  {
    id: '2',
    name: 'Kanishk',
    jobRole: 'Worker level 2',
    deptName: 'Mech',
    inTime: '9:00 AM',
    outTime: '5:00 PM',
    totalHours: '8 Hr',
  },
  {
    id: '3',
    name: 'Chhavvi',
    jobRole: 'Worker level 2',
    deptName: 'Finance',
    inTime: '10:00 AM',
    outTime: '6:00 PM',
    totalHours: '8 Hr',
  },
  {
    id: '4',
    name: 'Sujeet',
    jobRole: 'Worker level 4',
    deptName: 'HR',
    inTime: '7:00 AM',
    outTime: '3:00 PM',
    totalHours: '8 Hr',
  },
  {
    id: '5',
    name: 'Rahul',
    jobRole: 'Manager',
    deptName: 'HR',
    inTime: '8:00 AM',
    outTime: '4:00 PM',
    totalHours: '8 Hr',
  },
  {
    id: '6',
    name: 'Amit',
    jobRole: 'Manager',
    deptName: 'Finance',
    inTime: '9:00 AM',
    outTime: '5:00 PM',
    totalHours: '8 Hr',
  },
];

export default function AttendanceList({ navigation }) {
  const [selectedRole, setSelectedRole] = useState('Worker');
  const [searchText, setSearchText] = useState('');
  const [filterBy, setFilterBy] = useState('Name');
  const [isSorted, setIsSorted] = useState(false);

  // Filter and optionally sort data based on selected role, search text, and filterBy criteria
  const filteredData = data
    .filter(item => {
      if (selectedRole === 'All' || item.jobRole.includes(selectedRole)) {
        if (filterBy === 'Name') {
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        } else if (filterBy === 'JobRole') {
          return item.jobRole.toLowerCase().includes(searchText.toLowerCase());
        }
        else if (filterBy === 'Department') {
          return item.deptName.toLowerCase().includes(searchText.toLowerCase());
        }
      }
      return false;
    })
    .sort((a, b) => {
      if (isSorted) {
        return a.name.localeCompare(b.name); // Sort by name if sorting is enabled
      }
      return 0; // Default order if sorting is not enabled
    });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconPlaceholder} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Job Role: {item.jobRole}</Text>
        <Text style={styles.details}>Department: {item.deptName}</Text>
        <Text style={styles.details}>In Time: {item.inTime}</Text>
        <Text style={styles.details}>Out Time: {item.outTime}</Text>
        <Text style={styles.totalHours}>Total: {item.totalHours}</Text>
      </View>
    </View>
  );

  const onBackPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminDashboard' }],
    });
  };

  return (
    <>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <Button onPress={onBackPressed} icon={require('../assets/arrow_back.png')} />
        <Header title="Attendance List" />
      </View>

      {/* Menu: Manager & Worker */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuItem, selectedRole === 'Manager' && styles.menuItemActive]}
          onPress={() => setSelectedRole('Manager')}
        >
          <Text style={styles.menuText}>Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, selectedRole === 'Worker' && styles.menuItemActive]}
          onPress={() => setSelectedRole('Worker')}
        >
          <Text style={styles.menuText}>Worker</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterBy}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterBy(itemValue)}
        >
          <Picker.Item label="Name" value="Name" />
          <Picker.Item label="Job Role" value="JobRole" />
          <Picker.Item label="Department" value="Department" />
        </Picker>
        <TextInput
          style={styles.searchBox}
          placeholder={`Search by ${filterBy}`}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Sort by Name Button */}


      <View style={styles.container}>
        <Text style={styles.header}>Attendance List ({selectedRole})</Text>
        <Text style={styles.date}>2 Aug 2024</Text>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    marginBottom: 10,
    // backgroundColor: '#fff',
    backgroundColor: '#101b23',
    
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: '#101b23',
    padding: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    // backgroundColor: '#f0f0f0',
    backgroundColor: '#101b23',
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: '#007bff',
  },
  menuText: {
    color: '#000',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#101b23',
  },
  picker: {
    height: 50,
    width: 150,
  },
  searchBox: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginLeft: -12,
  },
  sortContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  sortButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  sortText: {
    // color: '#fff',
        backgroundColor: '#101b23',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEEEE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#cccccc',
    borderRadius: 25,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  totalHours: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

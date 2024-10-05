import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const CustomHeader = ({ navigation, title, role }) => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    );
   
  };

  return (
    <View style={styles.headerContainer}>
      {/* Title on the left */}
      <Text style={styles.title}>{title}</Text>

      {/* Role and Logout on the right */}
      <View style={styles.rightContainer}>
        <Text style={styles.role}>Role: {role}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:25,
    alignItems: 'center',
    height: 70,

    paddingHorizontal: 10,
    backgroundColor: '#101b23',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
     color: '#fff'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  role: {
    fontSize: 16,
    marginRight: 15, // Spacing between Role and Logout
    color: '#fff'
  },
  logout: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CustomHeader;

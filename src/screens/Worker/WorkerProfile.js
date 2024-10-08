import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkerProfile({ navigation }) {
  const [storedValue, setStoredValue] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isContactVisible, setContactVisible] = useState(false);
  const [isCompanyVisible, setCompanyVisible] = useState(false); // State for company info
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
    const getSessionData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Assuming userId is stored in AsyncStorage
        const token = await AsyncStorage.getItem('token'); // Fetch token from AsyncStorage
        if (userId && token) {
          const response = await fetch(`http://13.50.183.255:9003/user-service/users/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.status === 200) {
            setUserData(data.response);
          }
        }
      } catch (e) {
        console.error('Failed to fetch user data', e);
      }
    };

    getSessionData();
  }, []);



  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    );
  };

  const toggleContactInfo = () => {
    setContactVisible(!isContactVisible);
  };

  const toggleCompanyInfo = () => {
    setCompanyVisible(!isCompanyVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.settingsIcon}>
          <FontAwesome name="cog" size={24} color="white" />
        </TouchableOpacity>

        {/* Profile Image */}
        <Image
          source={require('../../assets/pic1.png')} // Placeholder for profile image
          style={styles.profileImage}
        />

        {/* Name and Title */}
        <Text style={styles.name}>{`${userData?.firstName || 'N/A'} ${userData?.lastName || 'N/A'}`}</Text>
        <Text style={styles.title}>{userData?.roleDto?.name || 'N/A'}</Text>
        <Text style={styles.location}>{userData?.employeeId || 'N/A'}</Text>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Contact Information */}
        <TouchableOpacity style={styles.contactContainer} onPress={toggleContactInfo}>
          <Text style={styles.contactTitle}>Contact Information</Text>
          <FontAwesome name={isContactVisible ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
        </TouchableOpacity>
        {isContactVisible && (
          <View style={styles.contactDetails}>
            <Text style={styles.contactInfo}>{`Phone: ${userData?.phone || 'N/A'}`}</Text>
            <Text style={styles.contactInfo}>{`Email: ${userData?.email || 'N/A'}`}</Text>
          </View>
        )}

        {/* Company Information */}
        <TouchableOpacity style={styles.companyContainer} onPress={toggleCompanyInfo}>
          <Text style={styles.companyTitle}>Company Information</Text>
          <FontAwesome name={isCompanyVisible ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
        </TouchableOpacity>
        {isCompanyVisible && (
          <View style={styles.companyDetails}>
            <Text style={styles.companyInfo}>{`Company Name: ${userData?.companyName || 'N/A'}`}</Text>
            <Text style={styles.companyInfo}>{`Location: ${userData?.companyLocation || 'N/A'}`}</Text>
            <Text style={styles.companyInfo}>{`Department: ${userData?.department || 'N/A'}`}</Text>
          </View>
        )}


        {/* Bottom Checkmark */}
        <View style={styles.bottomCheckmark}>
          <FontAwesome name="check-circle" size={24} color="white" />
        </View>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1A24',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 250, // Ensure padding for bottom navigation visibility
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 50,
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  location: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#2c2c54',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
    width: '50%',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  contactContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0F1A24',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactDetails: {
    fontSize: 15,
    marginTop: 10,
    paddingLeft: 10,
  },
  contactInfo: {
    color: 'white',
    fontSize: 18, // Increased size for contact info
    marginBottom: 5,
  },
  companyContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0F1A24',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyDetails: {
    fontSize: 15,
    marginTop: 10,
    paddingLeft: 10,
  },
  companyInfo: {
    color: 'white',
    fontSize: 18, // Increased size for company info
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  listItemText: {
    color: 'white',
    fontSize: 18,
  },
  bottomCheckmark: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2c2c54',
    padding: 10,
    borderRadius: 50,
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

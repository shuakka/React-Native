import React,{useEffect,useState} from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet,ScrollView  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WorkerProfile({navigation}) {

  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    // Retrieve session data on app load
    const getSessionData = async () => {
      try {
        const value = await AsyncStorage.getItem('role');
        if (value !== null) {
          setStoredValue(value);
        }
      } catch (e) {
        console.error('Failed to fetch session data', e);
      }
    };

    getSessionData();
  }, []);

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
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon}>
        <FontAwesome name="cog" size={24} color="white" />
      </TouchableOpacity>
      
      {/* Profile Image */}
      <Image
        source={require('../../assets/pic1.png')} // Replace with actual image link
        style={styles.profileImage}
      />

      {/* Name and Title */}
      <Text style={styles.name}>Jenny Thompson</Text>
      <Text style={styles.title}>Marketing Manager</Text>
      <Text style={styles.location}>San Francisco, CA</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Contact Information */}
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.listItemText}>Contact information</Text>
        <Text style={styles.listItemSubText}>Add or update your phone number and email address</Text>
        <FontAwesome name="chevron-right" size={18} color="white" />
      </TouchableOpacity>

      {/* Take a Break */}
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.listItemText}>Company Information</Text>
        <FontAwesome name="chevron-right" size={18} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
        <Text style={styles.listItemText}>Logout</Text>
        <FontAwesome name="chevron-right" size={18} color="white" />
      </TouchableOpacity>
     
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
    </View>
  );
}

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
  listItemSubText: {
    color: 'gray',
    fontSize: 14,
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
  }
});

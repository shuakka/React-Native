import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView,TextInput ,Animated,Easing} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function ManagerProfile({ navigation }) {
  const [storedValue, setStoredValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isContactVisible, setContactVisible] = useState(false);
  const [id, setId] = useState(false);
  const [isCompanyVisible, setCompanyVisible] = useState(false); // State for company info
  const [status, setStatus] = useState(''); 
  const [editInput, setEditInput] = useState(false); 
  const [isFocused, setIsFocused] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const labelTranslateY = useState(new Animated.Value(0))[0]; // Start with label at the bottom of the input field
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

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
        const userId = await AsyncStorage.getItem('userId');
        setId(userId) // Assuming userId is stored in AsyncStorage
        const token = await AsyncStorage.getItem('userToken'); // Fetch token from AsyncStorage
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


  // Focus handler to animate label upwards
  const handleFocus = () => {
    setIsFocused(true);
    if (inputValue || isFocused) {
      Animated.timing(labelTranslateY, {
        toValue: -20,  // Move the label up when focused or input is filled
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  // Blur handler to animate label back down
  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
      Animated.timing(labelTranslateY, {
        toValue: 0,  // Reset label position when blurred
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const editManagerAPI = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Assuming userId is stored in AsyncStorage
      const token = await AsyncStorage.getItem('userToken'); // Fetch token from AsyncStorage
      const payload = {
        id: +userId,  // Adding the id property directly here
        ...formData,  // Spreading the formData to keep all its current properties
      };
      if (userId && token) {
        const response = await fetch(`http://13.50.183.255:9003/user-service/users/updateUser`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          body:JSON.stringify(
            payload
        )
        });
        const data = await response.json();
        if (data.status === 200) {
          setUserData(data.response);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Updated data successfully',
            position: 'top',
          });
        }
      }
    } catch (e) {
      console.error('Failed to fetch user data', e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update data',
        position: 'top',
      });
    }
  };


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

  const onPressEdit = () => {
    setIsFocused(true)
    setEditInput(true)
    
  };

  const handleCheckmarkClick = () => {
    editManagerAPI();
  };
  

  const onChangeText = (field, value) =>{
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  }
console.log("formDataformData-",formData);
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
        {/* <TextInput style={isFocused && styles.inputText} onChangeText={(text) => onChangeText("firstName", text)}  editable={userData?.firstName?true: editInput} value={userData?.firstName}  /> */}
        <Animated.Text
          style={[
            styles.inputLabel,
            {
              transform: [{ translateY: labelTranslateY }],
              opacity: labelTranslateY.interpolate({
                inputRange: [-20, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          First Name
        </Animated.Text>
        <TextInput
        style={[styles.title,isFocused && styles.inputText]} onChangeText={(text) => onChangeText("firstName", text)}  defaultValue={userData!=undefined? userData?.firstName:""}
          // style={styles.inputText}
          placeholder="Enter First Name"
          // value={inputValue}
          // onChangeText={setInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <Text style={styles.title}>{userData?.roleDto?.name || 'N/A'}</Text>
        <Text style={styles.location}>{userData?.employeeId || 'N/A'}</Text>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText} onPress={onPressEdit}>Edit</Text>
        </TouchableOpacity>

        {/* Contact Information */}
        <TouchableOpacity style={styles.contactContainer} onPress={toggleContactInfo}>
          <Text style={styles.contactTitle}>Contact Information</Text>
          <FontAwesome name={isContactVisible ? 'chevron-up' : 'chevron-down'} size={18} color="white" />
        </TouchableOpacity>
        {isContactVisible && (
          <View style={styles.contactDetails}>

        {/* Animated label */}
        <Animated.Text
          style={[
            styles.inputLabel,
            {
              transform: [{ translateY: labelTranslateY }],
              opacity: labelTranslateY.interpolate({
                inputRange: [-20, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          Phone number
        </Animated.Text>
        <TextInput
        style={isFocused && styles.inputText}  keyboardType="numeric" onChangeText={(text) => onChangeText("phone", text)} editable={editInput}
         
          placeholder="Enter Phone number"
          // value={inputValue}
          // onChangeText={setInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
            {/* <TextInput style={[styles.contactInfo,isFocused && styles.inputText]}  keyboardType="numeric" onChangeText={(text) => onChangeText("phone", text)} editable={editInput}></TextInput> */}
            {/* <TextInput style={[styles.contactInfo,isFocused && styles.inputText]} onChangeText={(text) => onChangeText("email", text)} editable={editInput} ></TextInput> */}

        {/* Animated label */}
        <Animated.Text
          style={[
            styles.inputLabel,
            {
              transform: [{ translateY: labelTranslateY }],
              opacity: labelTranslateY.interpolate({
                inputRange: [-20, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          Email
        </Animated.Text>
        <TextInput
        style={isFocused && styles.inputText} onChangeText={(text) => onChangeText("email", text)} editable={editInput}
          // style={styles.inputText}
          placeholder="Enter Email"
          // value={inputValue}
          // onChangeText={setInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
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
        <TouchableOpacity style={styles.bottomCheckmark} onPress={handleCheckmarkClick}>
        <View style={styles.bottomCheckmark}>
          <FontAwesome name="check-circle" size={24} color="white" />
        </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('ManagerDashboard')}>
          <FontAwesome name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ManagerAttendance')}>
          <FontAwesome name="calendar" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ManagerProfile')}>
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
    fontSize: 15,
    marginTop: 50,
    paddingLeft: 10,
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
  input: {
    height: 50,
    borderColor: '#ccc',       // Default border color
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    color: 'white',            // Text color for dark backgrounds
    marginTop: 20,
  },


  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Dosis',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  inputText: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    color: '#455A64',
  },
  inputLabel: {
    position: 'absolute',
    left: 20,
    top: '50%',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Dosis',
    transform: [{ translateY: 0 }],
    opacity: 0,
    transition: 'transform 300ms ease-in-out',
  },
});

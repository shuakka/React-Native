import React, { useState ,useEffect} from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {loginuser} from '../service/WorkerService';

export default function LoginScreen({ navigation }) {
  const [Number, setNumber] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const API_URL = 'http://13.50.183.255:9003/user-service/auth/login';

  const [data, setData] = useState([]);

  useEffect(() => {
   
  }, []);

  const fetchData = async () => {
    try {
      const response = await loginuser(Number,password);
      console.log("resposne---",response)
      if(response.data.status===200){
        console.log("resposne---",response.status)
   
      setData(response.data.response.roleDto.name);
      handleRoleSession(response.data.response.roleDto.name)
      handleTokenSession(response.data.response.token)
      handleIdSession(response.data.response.roleDto.id)
      if(response.data.response.roleDto.name=="WORKER"){
        navigation.reset({
          index: 0,
          routes: [{ name: 'WorkerDashboard' }],
        });
      }
      }
      else{
        showErrorMessage()
      }

    } catch (error) {
      showErrorMessage()
      console.error('Error fetching data:', error);
    }
  };
  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://13.50.183.255:9003/user-service/auth/login', { // Replace with your API endpoint
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json', // Specify the content type
  //       },
  //       body: JSON.stringify({
  //         "username": "9993465963",
  //         "password": "test@123"
  //     }),
  //     });

  //     // Check if the response is ok
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }

  //     const data = await response.json(); // Parse JSON data from the response

  //     // Handle success or error messages
  //     if (data.success) {
  //       setMessage('Login successful!'); // Display success message
  //     } else {
  //       setMessage(data.message || 'Login failed.'); // Display error message
  //     }
  //   } catch (error) {
  //     setMessage('Error: ' + error.message); // Display any errors
  //   }
  // };

  const onLoginPressed = async () => {
    // const url = 'http://127.0.0:9000/api/user-service/auth/login'; // for Android emulator
    // const url = 'http://localhost:9000/api/user-service/auth/login'; // for iOS simulator
    // const url = 'http://110.224.189.121:9000/api/user-service/auth/login'; // for physical devices

    // const data = {
    //   username: Number.value, // Use the phone number from the input
    //   password: password.value, // Use the password as the password
    // };

    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const responseData = await response.json();
    //   console.log('Success:', responseData);

      // Navigate to the Dashboard only if login is successful
      //Make this one condition after adding API
  
     
      fetchData();
      // handleLogin();
    
     
// console.log(data+"---main")
//       if(+(Number.value)===12345){
//         //admin
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'AdminDashboard' }],
//         });
//         handleSaveSession("admin")
//       }
//       else if(+(Number.value)===11111){
//         //admin
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'AdminDashboard' }],
//         });
//         handleSaveSession("Manager")
//       }
//       else if(+(Number.value)===22222){
//         //admin
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'WorkerDashboard' }],
//         });
//         handleSaveSession("worker")
//       }

//       else{
//         showErrorMessage();
//       }
 
    // } catch (error) {
    //   console.error('Error:', error);
    //   // Optionally handle the error (e.g., show a notification to the user)
    // }
  };
  const handleRoleSession = async (data) => {
    try {
      await AsyncStorage.setItem('role', data);
    } catch (e) {
      console.error('Failed to save session data', e);
    }
  };
  const handleTokenSession = async (data) => {
    try {
      await AsyncStorage.setItem('token', data);
    } catch (e) {
      console.error('Failed to save session data', e);
    }
  };
  const handleIdSession = async (data) => {
    try {
      await AsyncStorage.setItem('id', data);
    } catch (e) {
      console.error('Failed to save session data', e);
    }
  };
  
  const showErrorMessage = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Invalid Login Credentials',
      position: 'top',
    });
  };
  console.log(data?.response?.roleDto?.name+"---main")
  return (
    <View style={styles.main}>
      <View style={styles.backbtn}>
      <BackButton goBack={navigation.goBack} /></View>
      <Header style={styles.mainHeader}>Welcome back</Header>
      <TextInput
        style={styles.textbox}
        label="Phone Number"
        returnKeyType="next"
        value={Number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        autoCapitalize="none"
        maxLength={10}
        keyboardType="phone-pad"
      />
      <TextInput
      style={styles.textbox}
        label="Enter Password"
        returnKeyType="done"
        value={password.value}
        maxLength={40}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        keyboardType="phone-pad"
        secureTextEntry
      />
      <View style={styles.password}>
        <TouchableOpacity>
          <Text style={styles.forgotbtn}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button style={styles.btnColor} mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.fontColor}>New User?  Sign Up</Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    backgroundColor: '#101b23',
    flex: 1,
    padding: 15,
  },
  backbtn :{
  left:-2
  },
  mainHeader: {
    width: '100%',
    fontSize: 25,
    marginTop: '30%',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    color:'#fff'
  },
  textbox:{
    backgroundColor:'#243546',
    color:'white',
  },
  btnColor :{
    backgroundColor: '#1a80e6',

  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
     color:'#fff'
  },
  password: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 24,
    
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgotbtn: {
    fontSize: 16,
    color:'#849ab1',
    textDecorationLine: 'underline'
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
  fontColor:{
    color : '#fff',
    textAlign: 'center',
    alignItems:'center',
    top:10,
    left:3
  }
});

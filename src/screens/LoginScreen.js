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



  useEffect(() => {
   
  }, []);

  const fetchData = async () => {
    try {
      const response = await loginuser(Number,password);
      if(response.data.status===200){
        console.log("resposne-2--",response.data.response.token)
        console.log("resposne-3--",response.data.response.roleDto.id)
      handleRoleSession(response.data.response.roleDto.name)
      handleIdSession(response.data.response.roleDto.id)
      handleTokenSession(response.data.response.token)
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

  const onLoginPressed = async () => {
    fetchData();

  };
  const handleRoleSession = async (data) => {
    try {
      await AsyncStorage.setItem('role', data);
    } catch (e) {
      console.error('Failed to save session data', e);
    }
  };
  const handleTokenSession = async (data) => {
    console.log(data,"Token")
    try {
      await AsyncStorage.setItem('token', String(data));
    } catch (e) {
      console.error('Failed to save session data', e);
    }
  };
  const handleIdSession = async (data) => {
    console.log(typeof (data))
    try {
      await AsyncStorage.setItem('id', String(data));
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

  return (
    <View style={styles.main}>
      <View style={styles.backbtn}>
      <BackButton goBack={navigation.goBack} /></View>
      <Header style={styles.mainHeader}>Welcome back</Header>
      <TextInput
        style={[styles.textbox]}
        placeholder="Phone Number"
        placeholderTextColor="#8093a9"
        returnKeyType="next"
        value={Number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        autoCapitalize="none"
        maxLength={10}
        keyboardType="phone-pad"
      />
      <TextInput
      style={styles.textbox}
      placeholder="Enter Password"
      placeholderTextColor="#8093a9"
        returnKeyType="done"
        value={password.value}
        maxLength={40}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        keyboardType="default"
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
    fontColor:'white'
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

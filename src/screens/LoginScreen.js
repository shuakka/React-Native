import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { loginuser } from '../service/WorkerService';

export default function LoginScreen({ navigation }) {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    try {
      const response = await loginuser(number, password);
      console.log('response---', response.data);

      if (response.data.status === 200) {
        const { roleDto, token } = response.data.response;

        await AsyncStorage.setItem('userFirstName', response.data.response.firstName);
        await AsyncStorage.setItem('userLastName', response.data.response.lastName);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userRole', roleDto.name);

        if (roleDto.name === 'WORKER') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'WorkerDashboard' }],
          });
        }
      } else {
        showErrorMessage();
      }
    } catch (error) {
      showErrorMessage();
      console.error('Error fetching data:', error);
    }
  };

  const onLoginPressed = async () => {
    if (number.trim() === '' || password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Phone number and password are required.',
        position: 'top',
      });
      return;
    }
    fetchData();
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
        <BackButton goBack={navigation.goBack} />
      </View>
      <Header style={styles.mainHeader}>Welcome back</Header>
      <TextInput
        style={styles.textbox}
        label="Phone Number"
        returnKeyType="next"
        value={number}
        onChangeText={setNumber}
        autoCapitalize="none"
        maxLength={10}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.textbox}
        label="Enter Password"
        returnKeyType="done"
        value={password}
        maxLength={40}
        onChangeText={setPassword}
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
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#0F1A24',
    flex: 1,
    padding: 15,
  },
  backbtn: {
    left: -2,
  },
  mainHeader: {
    width: '100%',
    fontSize: 25,
    marginTop: '30%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  textbox: {
    height: 30,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderColor: '#0F1A24',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  btnColor: {
    backgroundColor: '#1a80e6',
    height: 50, // Adjust height for a more professional look
    justifyContent: 'center', // Center the text vertically
    borderRadius: 5, // Keep rounded corners
    marginBottom: 15,
  },
  password: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  forgotbtn: {
    fontSize: 16,
    color: '#849ab1',
    textDecorationLine: 'underline',
  },
});

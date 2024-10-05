import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [Number, setNumber] = useState({ value: '', error: '' })
  const [otp, setOTP] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminDashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

      <Header style={styles.mainHeader}>Create Account </Header> 
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
     <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={Number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        autoCapitalize="none"
        maxLength={10}
        keyboardType='phone-pad'
        onSubmitEditing={() => Keyboard.dismiss()}
      />
         <View style={styles.otp}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.otptext}>Send Password?</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={otp.value}
        onChangeText={(text) => setOTP({ value: text, error: '' })}
        maxLength={4}
        keyboardType='phone-pad'
        onSubmitEditing={() => Keyboard.dismiss()}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  otp: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  otptext: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  mainHeader:{
    width: '100%',
    fontSize:28,
    marginTop:'50%',
    fontWeight:'bold',
    alignItems: 'flex-start',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

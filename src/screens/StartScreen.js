import React from 'react'
import {StyleSheet,View} from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <Background>
      <Logo />
      <Header style={styles.fontColor}>Ulti-Met</Header>
      <Paragraph style={styles.fontColor}>
        An industry 4.0 company .
      </Paragraph>
      <Button
        style={styles.btnColor}
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Start
      </Button>

    </Background>
    </View>
  )
  
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#101b23',
    flex: 1,
    // paddingTop: 15,
  },
  fontColor: {
    marginTop:7,
    color: '#fff'
  },
  btnColor :{
    marginTop:50,
    backgroundColor: '#1a80e6',
  }
})
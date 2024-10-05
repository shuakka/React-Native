import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/icon.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    marginTop:140,
    width: 133,
    height: 54,
    marginBottom: 8,
  },
})

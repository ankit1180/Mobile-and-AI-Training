import { StyleSheet,  View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'

const App = () => {
  return (
    <View style={styles.container}>
     <LoginScreen />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4FD3DA',
    flex: 1,
    alignItems: 'center',
justifyContent: 'center',
  }
})
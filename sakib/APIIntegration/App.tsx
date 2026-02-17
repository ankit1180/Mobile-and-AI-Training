import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductScreen from './src/screens/ProductScreen'

const App = () => {
  return (
    <View style={styles.container}>
     <ProductScreen />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : '#fff'
  }
})
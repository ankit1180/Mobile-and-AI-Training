import { StyleSheet,  View } from 'react-native'
import React from 'react'
import Header from './src/components/Header'
import Search from './src/components/Search'
//import Model from './src/components/Model'
import AddFavourites from './src/components/AddFavourites'
import Model from './src/components/Model'
import Routes from './src/Navigations/Routes'

const App = () => {
  return (
    <Routes />
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#fff'
  }
})
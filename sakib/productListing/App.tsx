import { StyleSheet,  View } from 'react-native'
import React from 'react'
//import ProductScreen from './src/screens/ProductScreen'
import Routes from './src/Navigations/Routes'
import { Provider } from 'react-redux'
import {store} from './src/redux/store/store.js'
const App = () => {
  return (
    <Provider store={store}>
       <Routes/>

    </Provider>
    
   
  )
}

export default App

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    }
})
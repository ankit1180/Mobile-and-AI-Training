import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import BrandAndVariants from '../components/BrandAndVariants';
//import { Image } from 'react-native/types_generated/index';

const TractorsDetailScreen = ({route}) => {

    const {tractor} = route.params;

    console.log('tractor in tractor detail screen ======>>>>>> ',tractor);
    
  return (
    <View style={styles.container}>

    <Header/>
    
   <BrandAndVariants tractor={tractor}/>
    </View>
  )
}

export default TractorsDetailScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffff'
    },
    
    
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import CompareVariants from '../components/CompareVariants';

const CompareVariantsScreen = ({route}) => {

  const {selectedVariantId} = route.params;

  console.log('selectedVariantId in compare variants screen =====>>>>> ', selectedVariantId);
  
  return (
    <View style={styles.container}>
     <Header title='Compare Models'/>
     <CompareVariants selectedVariantId = {selectedVariantId} />

    </View>
  )
}

export default CompareVariantsScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})
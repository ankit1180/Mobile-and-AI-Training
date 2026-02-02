import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default Cart = ({route,navigation}) =>{
    
   const {productData} = route.params;

  return(
    <View style = {styles.container}>
      
      <Text style = {styles.text}>This is Cart Page</Text>
        <View style = {styles.dataShowContainer}>
          Product Name: <Text  style = {styles.text2}>{productData.name}</Text>
          Description:<Text  style = {styles.text2}>{productData.description}</Text>
        </View>
    

        
      <View  style = {styles.GoBackButton}>
       <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          color="#841584"
        />
      </View>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
   text:{
    color: 'white',
    marginBottom: 10,
  },
  text2:{
    color: 'white',
    marginBottom: 10,
  },
  dataShowContainer:{
    color: 'white',
  },
  GoBackButton:{
    marginTop: 10,
  }
})
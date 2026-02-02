import { View, Text, Button, StyleSheet } from 'react-native';

 const product = {
    id: 1,
    name: 'I Phone',
    description: 'This is a Phone'
  }

export default HomeScreen = ({navigation}) =>{

  return(
    <View style = {styles.container}>
      
      <Text style = {styles.text}>This is Home Page</Text>
      <Button title = "Go To Prroduct Page"
      onPress = {() =>{
        navigation.navigate('ProductDetails' , {productData:product})
      }}/>
    
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
  }
})
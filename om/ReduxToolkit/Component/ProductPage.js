import React from 'react';
import { View, StyleSheet, Text, Button ,FlatList,Image,TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import {addItem} from "../features/CartItemSlice";

import { logout } from "../features/loginSlice";




const data = [
  {
    "id":1,
    "item_name": "Wireless Ergonomic Mouse",
    "image": "https://picsum.photos/seed/picsum/200/300",
    "price": 45.99,
    "qty":1
  },
  { 
     "id":2,
    "item_name": "4K Ultra HD Webcam",
    "image": "https://picsum.photos/200/300",
    "price": 120.50,
      "qty":1
  },
  
  {
     "id":4,
    "item_name": "Mechanical Keyboard (RGB)",
    "image": "https://picsum.photos/seed/picsum/200/300",
    "price": 99.99,
      "qty":1
  },
  
  {
     "id":6,
    "item_name": "USB-C Hub Multiport Adapter",
    "image": "https://picsum.photos/200/300",
    "price": 35.49,
      "qty":1
  },
  {
     "id":7,
    "item_name": "Portable Bluetooth Speaker",
    "image": "https://picsum.photos/200/300",
    "price": 68.25,
      "qty":1
  },
  {
     "id":8,
    "item_name": "Smart Fitness Watch",
    "image": "https://picsum.photos/200/300",
    "price": 199.00,
      "qty":1
  },
  {
     "id":9,
    "item_name": "Adjustable Standing Desk",
    "image": "https://picsum.photos/200/300",
    "price": 350.00,
      "qty":1
  },
  {
     "id":10,
    "item_name": "High-Back Office Chair",
    "image": "https://picsum.photos/200/300",
    "price": 210.00,
      "qty":1
  }
]



const ProductPage = ({ navigation }) => {
  
  const dispatch = useDispatch();

  const addItemToCart = (item) =>{

    console.log(item);
    
    dispatch(addItem(item))

  }


  //logout function 

  const logoutManage = () =>{
     dispatch(logout())
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.productBox}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.details}>
              <Text style={styles.name}>{item.item_name}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>

              <TouchableOpacity style = {styles.addtoCartbtn}

                 onPress={()=> addItemToCart(item)}
              >
                <Text style = {styles.addToCartText}>Add To Cart</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        )}
      />
      <Button 
      title='Logout'
      onPress={()=> logoutManage()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  list: {
    padding: 12,
  },

  productBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 3, 
   
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  details: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  addtoCartbtn:{
    backgroundColor:'black',
    height: '30',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,

  },
  addToCartText:{
    color: 'white'
  }
});

export default ProductPage;

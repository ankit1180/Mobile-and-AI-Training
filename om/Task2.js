import React from 'react';
import { View, FlatList, StyleSheet, Alert,Image,Text,TouchableOpacity } from 'react-native';
import { useState} from 'react';


const data = [
  {
    "item_name": "Wireless Ergonomic Mouse",
    "image": "https://picsum.photos/seed/picsum/200/300",
    "price": 45.99
  },
  {
    "item_name": "4K Ultra HD Webcam",
    "image": "https://picsum.photos/200/300",
    "price": 120.50
  },
  {
    "item_name": "Noise-Cancelling Headphones",
    "image": "https://picsum.photos/id/237/200/300",
    "price": 249.00
  },
  {
    "item_name": "Mechanical Keyboard (RGB)",
    "image": "https://picsum.photos/seed/picsum/200/300",
    "price": 99.99
  },
  {
    "item_name": "External Solid State Drive 1TB",
    "image": "https://picsum.photos/id/237/200/300",
    "price": 115.75
  },
  {
    "item_name": "USB-C Hub Multiport Adapter",
    "image": "https://picsum.photos/200/300",
    "price": 35.49
  },
  {
    "item_name": "Portable Bluetooth Speaker",
    "image": "https://picsum.photos/200/300",
    "price": 68.25
  },
  {
    "item_name": "Smart Fitness Watch",
    "image": "https://picsum.photos/200/300",
    "price": 199.00
  },
  {
    "item_name": "Adjustable Standing Desk",
    "image": "https://picsum.photos/200/300",
    "price": 350.00
  },
  {
    "item_name": "High-Back Office Chair",
    "image": "https://picsum.photos/200/300",
    "price": 210.00
  }
]


export default function App() {
 
   const [products, setProducts] = useState(data);

 

   const renderProductCard = ({ item }) => (
    


    <View style={styles.card}>
     
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

  
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.item_name}</Text>
        <Text style={styles.price}>{item.price}</Text>

  
        <TouchableOpacity style={styles.addButton} >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products available at this time.</Text>
    </View>
  );


  return (
    <FlatList
      data={products}
      renderItem={renderProductCard}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.listContainer}
    />
  )
  

};


const styles = StyleSheet.create({
 listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: 150, 
  },
  detailsContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})


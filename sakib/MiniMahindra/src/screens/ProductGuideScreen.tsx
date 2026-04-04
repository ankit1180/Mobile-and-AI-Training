import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import AddFavourites from '../components/AddFavourites';
import Model from '../components/Model';
import ModelVariants from '../components/ModelVariants';

const ProductGuide = () => {
    const [selectedModel, setSelectedModel] = useState(null);

    console.log('selectedModel in product guide ======>>>>>', selectedModel);
    
  return (
    <View style={styles.container}>
      <Header />

      <View style={{ paddingHorizontal: 10 }}>
        <Search />
        <Model onModelSelect={setSelectedModel}/>

        {selectedModel ?   <ModelVariants selectedModel={selectedModel} /> :  <AddFavourites />}
       
      
      </View>
    </View>
  );
};

export default ProductGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
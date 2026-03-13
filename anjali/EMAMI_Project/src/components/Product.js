import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../assets/css/product';
import {
  createRecord,
  fetchRecords,
  updateRecord,
  deleteRecord,
} from '../config/ReusableApi';
import Icon from 'react-native-vector-icons/Ionicons';

const Product = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchRecords('products', setProducts);
  }, []);

  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const resetForm = () => {
    setProductName('');
    setImage(null);
    setPrice('');
    setStockQty('');
    setCategory('');
    setEditingId(null);
    setIsEditMode(false);
  };

  const generateSfId = () => Date.now().toString();

  const addProduct = async () => {
    if (!productName || !price || !stockQty) {
      Alert.alert('Please add required fill *');
      return;
    }
    if (Number(stockQty) <= 0) {
      Alert.alert('Stock quantity must be greater than 0');
      return;
    }

    if (Number(price) <= 0) {
      Alert.alert('Price must be greater than 0');
      return;
    }

    await createRecord('products', {
      sf_id: generateSfId(),
      product_name: productName,
      image: image,
      price: Number(price),
      stock_qty: Number(stockQty),
      category: category,
    });

    Alert.alert('Success', 'Product Added');

    resetForm();
    setShowForm(false);
  };

  // const openStockEdit = item => {
  //   setEditingId(item.id);
  //   setStockQty(String(item.stock_qty));
  //   setShowForm(true);
  // };

  const openStockEdit = item => {
    setEditingId(item.id);
    setProductName(item.product_name);
    setPrice(String(item.price));
    setStockQty(String(item.stock_qty));
    setCategory(item.category);
    setImage(item.image);

    setIsEditMode(true);
    setShowForm(true);
  };

  const updateStock = async () => {
    if (Number(stockQty) <= 0) {
      Alert.alert('Stock quantity must be greater than 0');
      return;
    }
    await updateRecord('products', editingId, {
      stock_qty: Number(stockQty),
    });

    await fetchRecords('products', setProducts);

    setEditingId(null);
    setStockQty('');
    setIsEditMode(false);
    setShowForm(false);
  };

  const removeProduct = async item => {
    await deleteRecord('products', item.id);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={item.image ? { uri: item.image } : null}
          style={styles.productImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.product_name}</Text>

          <Text style={styles.price}>Price: ₹ {item.price}</Text>

          <Text style={styles.stock}>Stock: {item.stock_qty}</Text>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => openStockEdit(item)}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeProduct(item)}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  if (showForm) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Product Name<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={productName}
          editable={!isEditMode}
          onChangeText={setProductName}
          placeholder="Enter product name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Price <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          editable={!isEditMode}
          onChangeText={setPrice}
          placeholder="Enter Price"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Stock Quantity<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={stockQty}
          onChangeText={setStockQty}
          placeholder="Enter stock quantity"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          editable={!isEditMode}
          onChangeText={setCategory}
          placeholder="Enter Category"
          placeholderTextColor="#888"
        />

        {!isEditMode && (
          <>
            <Text style={styles.label}>Product Image</Text>

            <TouchableOpacity
              style={styles.imageContainer}
              onPress={chooseImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.uploadContainer}>
                  <Icon name="cloud-upload" size={28} color="#888" />
                  <Text style={styles.imageText}>Tap to upload image</Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}

        <View style={styles.onAddStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={isEditMode ? updateStock : addProduct}
          >
            <Text style={styles.buttonText}>
              {isEditMode ? 'Update Stock' : 'Add Product'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              resetForm();
              setIsEditMode(false);
              setEditingId(null);
              setShowForm(false);
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {products.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No Data Available
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          resetForm();
          setIsEditMode(false);
          setEditingId(null);
          setShowForm(true);
        }}
      >
        <Text style={{ color: '#fff', alignSelf: 'center' }}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default Product;


import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectTractorModal from './SelectTractorModal';
import AddTractorGrid from './AddTractorGrid';
import { useNavigation } from '@react-navigation/native';

const AddFavourites = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // const addTractorToFavourites = (tractor) => {
  //   setFavorites(prev => [...prev, tractor]);
  // }

  const addTractorToFavourites = tractor => {
    setFavorites(prev => {
      const updated = [...prev];
      console.log('updated =====>>>>> ', updated);
      updated[selectedSlot] = tractor;
      return updated;
    });
  };

  const handleRemoveFromFavourite = index => {
    const newList = favorites.filter((item, i) => i != index);

    setFavorites(newList);
  };

  const handleAdd = index => {
    setSelectedSlot(index); // remember clicked box
    setVisible(true); // open modal
  };

  useEffect(() => {
    console.log('favorites =====>>>> ', favorites);
  });

  const handleAddPress = () => {
    setShowGrid(true);
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   if (favorites.length === 0) {
  //     // nothing selected
  //     setShowGrid(false); // hide grid
  //     return;
  //   }

  //   console.log('Saved tractors:', favorites);

  //   // after saving
  //   setShowGrid(false);
  // };

  const handleRemove = index => {
    setFavorites(prev => {
      const updated = [...prev];
      updated[index] = undefined; // keep slot empty
      return updated;
    });
  };

  const handleSave = () => {
    // nothing selected
    if (favorites.filter(Boolean).length === 0) {
      setFavorites([]);
      setShowGrid(false);
      setIsEditing(false);
      return;
    }

    // remove empty slots
    const cleaned = favorites.filter(Boolean);

    setFavorites(cleaned);
    setShowGrid(false);
    setIsEditing(false);
  };

  // const handleEdit = () => {
  //   setIsEditing(true);
  //   setShowGrid(true);
  // };

  const handleEdit = () => {
    setShowGrid(true);
    setIsEditing(true);
  };

  return (
    <View style={styles.containerCard}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>

        {showGrid ? (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        ) : favorites.length > 0 ? (
          <TouchableOpacity style={styles.saveBtn} onPress={handleEdit}>
            <Text style={styles.saveText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAddPress}>
            <Icon name="add" size={24} color="#555" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.divider} />


      {showGrid ? (
        <AddTractorGrid
          tractors={favorites}
          onAdd={handleAdd}
          onRemove={handleRemove}
          isEditing={isEditing}
        />
      ) : favorites.length > 0 ? (
        <View style={styles.savedGrid}>
          {favorites.map((tractor, index) => (
            <View key={index} style={styles.tractorCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TractorDetails', { tractor })
                }
              >
                <Image source={{ uri: tractor.Image_URL }} style={styles.image} />
                <Text style={styles.model}>{tractor.Model}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>
          You haven't added a favorite tractor yet. Click the
          {'\n'}'+' icon to add one.
        </Text>
      )}

      <SelectTractorModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={addTractorToFavourites}
      />
    </View>
  );
};

export default AddFavourites;

const styles = StyleSheet.create({
  containerCard: {
    width: '96%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 7,
    paddingHorizontal: 20,
    elevation: 3
    
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#cfcfcf',
    marginVertical: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  saveBtn: {
    backgroundColor: '#e30613',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  savedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  image: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
  },

  model: {
    fontWeight: '600',
    fontSize: 14,
  },
  tractorCard: {
    width: '48%', // ⭐ grid width
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

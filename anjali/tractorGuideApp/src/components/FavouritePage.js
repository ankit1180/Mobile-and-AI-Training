import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/css/style';
import SelectTractorDrawer from './SelectTractorDrawer';
import { useNavigation } from '@react-navigation/native';
import editIcon from '../assets/Image/editicon.png';

export default function FavouritePage({ favorites, setFavorites }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  //const [favorites, setFavorites] = useState([null, null, null, null]);
  const [isEditing, setIsEditing] = useState(false);

  const [showCards, setShowCards] = useState(false);
  const hasFavorites = favorites.some(item => item !== null);

  const navigation = useNavigation();

  const handleAddTractor = tractor => {
    const updated = [...favorites];
    updated[activeIndex] = tractor;
    setFavorites(updated);
    setShowDrawer(false);
  };

  const handleDelete = index => {
    const updated = [...favorites];
    updated[index] = null;
    setFavorites(updated);
  };

  return (
    <View style={styles.favCard}>
      <View style={styles.favHeader}>
        <Text style={styles.favTitle}>Favorites</Text>

        {!hasFavorites ? (
          <TouchableOpacity
            onPress={() => {
              setShowCards(true);
              setIsEditing(true);
              const firstEmpty = favorites.findIndex(i => i === null);
              setActiveIndex(firstEmpty);
              // setShowDrawer(true);
            }}
          >
            <Ionicons name="add" size={28} color="#333" />
          </TouchableOpacity>
        ) : isEditing ? (
          <TouchableOpacity
            onPress={() => {
              setIsEditing(false);
              setShowCards(false);
            }}
          >
            <Text style={{ color: '#e60023', fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={{ color: '#999', fontWeight: 'bold' }}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.divider} />

      {/* Message */}
      {!hasFavorites && !isEditing && !showCards && (
        <Text style={styles.favMessage}>
          You haven't added a favorite tractor yet. Click the "+" icon to add
          one.
        </Text>
      )}

      {/* Grid */}
      {(hasFavorites || isEditing) && (
        <View style={localStyles.grid}>
          {favorites.map((item, index) => {
            if (!isEditing && item === null) return null;

            return (
              <View key={index} style={localStyles.card}>
                {item ? (
                  <>
                    <View style={localStyles.imageWrapper}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Details', {
                            tractor: {
                              modelName: item.modelName,
                              brand: item.brand,
                              image: item.image,
                              variants: item.variants,
                              selectedVariant: item.variant,
                            },
                          })
                        }
                      >
                        <Image source={item.image} style={localStyles.image} />
                      </TouchableOpacity>

                      {isEditing && (
                        <>
                          <TouchableOpacity
                            style={localStyles.editIcon}
                            onPress={() => {
                              setActiveIndex(index);
                              setShowDrawer(true);
                            }}
                          >
                            <Image
                              source={editIcon}
                              style={localStyles.editIconImage}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={localStyles.deleteIcon}
                            onPress={() => handleDelete(index)}
                          >
                            <Ionicons
                              name="close-circle"
                              size={28}
                              color="#999"
                            />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>

                    {/* <Text numberOfLines={1} style={localStyles.cardTitle}>
                      {item.brand}
                    </Text> */}
                    <Text numberOfLines={1} style={localStyles.cardTitle}>
                      {item.modelName}
                    </Text>
                  </>
                ) : (
                  isEditing && (
                    <TouchableOpacity
                      onPress={() => {
                        setActiveIndex(index);
                        setShowDrawer(true);
                      }}
                      style={{ alignItems: 'center' }}
                    >
                      <View style={localStyles.plusCircle}>
                        <Ionicons name="add" size={22} color="#999" />
                      </View>
                      <Text style={localStyles.addText}>Add Tractor</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            );
          })}
        </View>
      )}
      <SelectTractorDrawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        onAdd={handleAddTractor}
      />
    </View>
  );
}

const localStyles = {
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    height: 160,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },

  imageWrapper: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  image: {
    width: 160,
    height: 90,
    resizeMode: 'contain',
  },

  editIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIconImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },

  plusCircle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    padding: 14,
    marginBottom: 4,
    // dashed type border
    borderStyle: 'dashed',
  },

  addText: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },

  deleteIcon: {
    position: 'absolute',
    top: -22,
    right: -5,
  },

  cardTitle: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
};

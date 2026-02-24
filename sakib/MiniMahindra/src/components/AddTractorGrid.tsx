
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TOTAL_SLOTS = 4;   // total boxes to show

const AddTractorGrid = ({ tractors = [], onAdd,  onRemove, isEditing }) => {

    console.log('tractors ====>>>> ', tractors);
    

  return (
    <View style={styles.grid}>
      {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {

        console.log('index ====>>>> ',index);
        

        const tractor = tractors[index];

        console.log('tractors in add tractor grid =====>>>', tractor);
        

        if (tractor) {
          return (
            <View key={index} style={styles.card}>
              
               <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => onRemove(index)}
              >
                <Icon name="close" size={14} color="#fff" />
              </TouchableOpacity>

              {tractor.Image_URL && (
                <Image
                  source={{ uri: tractor.Image_URL }}
                  style={styles.image}
                />
              )}

              <Text style={styles.model}>
                {tractor.model}
              </Text>

              <Text style={styles.variant}>
                {tractor.variant}
              </Text>

              {/* <TouchableOpacity  key = {index} onPress={close}>
                <Icon name="close" size={12} color='#777'/>
              </TouchableOpacity> */}

            </View>
          );
        }
        return (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onAdd(index)}
          >
            <View style={styles.circle}>
              <Icon name="add" size={26} color="#777" />
            </View>
            <Text style={styles.text}>Add Tractor</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AddTractorGrid;
const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  card: {
    width: '48%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  text: {
    color: '#777',
    fontSize: 14,
  },

  image: {
    width: 90,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  model: {
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },

  variant: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  
  removeBtn: {
  position: 'absolute',
  top: 6,
  right: 6,
  backgroundColor: '#777',
  width: 22,
  height: 22,
  borderRadius: 11,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
},
});






















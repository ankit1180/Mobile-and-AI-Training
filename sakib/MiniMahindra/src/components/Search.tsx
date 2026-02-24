import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RightTractorVariantModal from './RightTractorVariantModal';

const Search = () => {
    const [rightTractorModal, setRightTractorModal] = useState(false)
  return (
    <TouchableOpacity 
     onPress={() => setRightTractorModal(true)}
    >
    <View style={styles.container}>
      <Icon name="search" size={22} color="#8e8e8e" style={styles.icon} />
      
      

        <Text>Find Right Tractor</Text>
     
    </View>

    <RightTractorVariantModal 
     rightTractorModal={rightTractorModal}
     onClose={() => setRightTractorModal(false)}
    />
     </TouchableOpacity>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    margin: 14
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
  },
});

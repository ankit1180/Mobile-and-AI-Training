import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import Tractors from '../utils/Tractors.json';

const Model = ({onModelSelect}) => {

  const [selectedModel, setSelectedModel] = useState(null);

  console.log('selectedModel ====>>>> ', selectedModel);

  // const allVariantsOfSelectedModel = Tractors.filter(t => t.Model === selectedModel)

  // console.log('allVariantsOfSelectedModel ======>>>>>> ', allVariantsOfSelectedModel);

  const clearSelection = () => {
    setSelectedModel(null);
    onModelSelect(null);
  };
  
  

  // unique models
  const modelData = [
    ...new Set(Tractors.map(t => t.Model)),
  ].map(item => ({
    label: item,
    value: item,
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Model</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.value}
        data={modelData}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={selectedModel}
        onChange={item => {
           onModelSelect(item.value)
          setSelectedModel(item.value)
        }
         
        }
        // renderRightIcon={() => (
        //   <Icon name="keyboard-arrow-down" size={22} color="#777" />
        // )}

        renderRightIcon={() => (
            selectedModel
              ? (
                <TouchableWithoutFeedback onPress={clearSelection}>
                  <Icon name="close" size={20} color="#777" />
                </TouchableWithoutFeedback>
              )
              : <Icon name="keyboard-arrow-down" size={22} color="#777" />
          )}
      />
    </View>
  );
};

export default Model;


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    margin: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 10,
  },
  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  placeholder: {
    color: '#888',
    fontSize: 15,
  },
  value: {
    color: '#333',
    fontSize: 15,
  },
});















// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import SelectTractorModal from './SelectTractorModal.tsx';
// import Tractors from '../utils/Tractors.json'
// import { Dropdown } from 'react-native-element-dropdown';

// const BrandModal = () => {
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const brands = [...new Set(Tractors.map(t => t.Brand))];
//   const brandData = [...new Set(Tractors.map(t => t.Brand))]
//       .map(v => ({ label: v, value: v }));

//   return (
//      <View style={styles.card}>
//       <Text style={styles.label}>Brand</Text>

//       <Dropdown
//         style={styles.dropdown}
//         placeholderStyle={styles.placeholder}
//         selectedTextStyle={styles.value}
//         data={brandData}
//         labelField="label"
//         valueField="value"
//         placeholder="Select"
//         value={selectedBrand}
//         onChange={item => setSelectedBrand(item.value)}
//         renderRightIcon={() => (
//           <Icon name="keyboard-arrow-down" size={22} color="#777" />
//         )}
//       />
//     </View>
//   );
// };

// export default BrandModal;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fffdee',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     margin: 10,
//     elevation: 5
//   },
//   label: {
//     fontSize: 16,
//     color: '#222',
//     marginBottom: 10,
//   },
//   dropdown: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#d6d6d6',
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fffdee',
//   },
//   placeholder: {
//     color: '#888',
//     fontSize: 15,
//   },
// });

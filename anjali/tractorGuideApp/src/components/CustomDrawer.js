import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/css/style';
import { data } from '../Data/data';
//dropdown for all values
import { Dropdown } from 'react-native-element-dropdown';

const { height } = Dimensions.get('window');

export default function CustomDrawer({ visible, onClose }) {
  const [selectedValues, setSelectedValues] = useState({
    hpCategory: null,
    productHP: null,
    brand: null,
    modelGroup: null,
    variant: null,
    rearTyre: null,
    drive: null,
  });
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.25,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  // dropdown values
  const formatData = arr =>
    arr.map(item => ({
      label: item,
      value: item,
    }));
  //reusable dropdown
  const RenderDropdown = (label, fieldKey, placeholder, zIndexValue = 1) => (
    <View style={[localStyles.field, { zIndex: zIndexValue }]}>
      <Text style={localStyles.label}>{label}</Text>

      <Dropdown
        style={localStyles.inputBox}
        containerStyle={{ zIndex: 999 }}
        data={formatData(data[fieldKey])}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValues[fieldKey]}
        onChange={item => {
          setSelectedValues(prev => ({
            ...prev,
            [fieldKey]: item.value,
          }));
        }}
        search
        searchPlaceholder="Search..."
      />
    </View>
  );
  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={localStyles.overlay}>
        <TouchableOpacity style={localStyles.backdrop} onPress={onClose} />

        <Animated.View style={[localStyles.drawer, { top: slideAnim }]}>
          <View style={localStyles.header}>
            <Text style={localStyles.title}>Find Right Tractor Variant</Text>
            <Ionicons name="information-circle" size={25} />
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />

          <View>
            {/* Row 1 */}
            <View style={localStyles.row}>
              <View style={localStyles.halfField}>
                {RenderDropdown('HP Category', 'hpCategory', 'Select')}
              </View>
              <View style={localStyles.halfField}>
                {RenderDropdown('Product HP', 'productHP', 'Select')}
              </View>
            </View>

            {/* Brand */}
            {RenderDropdown('Brand', 'brand', 'Select Brand')}

            {/* Model Group */}
            {RenderDropdown('Model Group', 'modelGroup', 'Select Model')}

            {/* Variant */}
            {RenderDropdown('Variant', 'variant', 'Select Variant')}

            {/* Row 2 */}
            <View style={localStyles.row}>
              <View style={localStyles.halfField}>
                {RenderDropdown('Rear Tyre', 'rearTyre', 'Select')}
              </View>
              <View style={localStyles.halfField}>
                {RenderDropdown('Drive', 'drive', 'Select')}
              </View>
            </View>
          </View>

          <View style={localStyles.buttonContainer}>
            <TouchableOpacity style={localStyles.searchButton}>
              <Text style={localStyles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const localStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  backdrop: {
    flex: 1,
  },

  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  field: {
    marginTop: 10,
  },

  label: {
    marginBottom: 6,
    fontSize: 14,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 48,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  halfField: {
    flex: 1,
    marginRight: 8,
  },

  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#e60023',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },

  searchText: {
    color: '#fff',
    fontWeight: '600',
  },
});

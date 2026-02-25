import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function CompareVariants({ model, onBack }) {
  const navigation = useNavigation();
  const variants = model?.variants || [];

  const [selected, setSelected] = useState([]);

  const toggle = item => {
    const name = item.variantName;

    if (selected.includes(name)) {
      setSelected(selected.filter(v => v !== name));
    } else {
      if (selected.length >= 4) return;
      setSelected([...selected, name]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {/* <TouchableOpacity onPress={onBack}>
        <Text
          style={{ color: '#e60023', fontWeight: 'bold', marginBottom: 10 }}
        ></Text>
      </TouchableOpacity> */}

      <View style={styles.cardContainer}>
        <FlatList
          data={variants}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            const active = selected.includes(item.variantName);

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => toggle(item)}
              >
                <Ionicons
                  name={active ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color={active ? '#e60023' : '#999'}
                />

                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.title}>{item.variantName}</Text>

                  <Text style={styles.sub}>
                    Brand:
                    <Text style={styles.name}> {model.brand}</Text> Model:
                    <Text style={styles.name}> {model.modelName}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/*  go to the compare varaints screen */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (selected.length >= 1) {
            navigation.navigate('CompareDetailsScreen', {
              model,
              selectedVariants: selected,
            });
          }
        }}
      >
        <Text style={styles.btnText}>Compare</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Compare</Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  separator: {
    height: 2,
    backgroundColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  sub: {
    fontSize: 12,
    color: '#666',
  },
  name: {
    fontSize: 12,
    color: '#777',
    fontWeight: 'bold',
    gap: 10,
  },
  btn: {
    backgroundColor: '#e60023',
    padding: 8,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

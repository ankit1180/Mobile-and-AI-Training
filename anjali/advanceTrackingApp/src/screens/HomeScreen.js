import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../header/CustomHeader';
import { styles } from '../assets/css/style';
import MAndMPage from '../components/MAndMPage';
import DealerShipPage from '../components/DealerShipPage';
import SearchComponent from '../components/SearchComponent';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isToggle, setIsToggle] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigation = useNavigation();

  const [selectedFilters, setSelectedFilters] = useState({
    tehsil: null,
    ageing: null,
    paymentType: null,
    salesman: null,
    retailStatus: null,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f2f2' }}>
      <CustomHeader title="Advance Tracker" />

      <View style={styles.subHeader}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            onPress={() => setIsToggle(true)}
            style={[styles.button, isToggle && styles.activeButton]}
          >
            <Text style={[styles.buttonColor, isToggle && styles.activeText]}>
              M&M
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsToggle(false)}
            style={[styles.button, !isToggle && styles.activeButton]}
          >
            <Text style={[styles.buttonColor, !isToggle && styles.activeText]}>
              DealerShip
            </Text>
          </TouchableOpacity>
        </View>
        32ewsdc
        <View style={styles.rightSection}>
          <View style={styles.rightDivider} />
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => {
              navigation.navigate('SummaryScreen');
            }}
          >
            <Ionicons name="document-text-outline" size={20} color="blue" />
            <Text style={styles.summaryText}>Summary</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <Ionicons name="search-outline" size={17} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Name/Mobile No."
            placeholderTextColor="#777"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity
          onPress={() => setIsFilterOpen(!isFilterOpen)}
          style={[
            styles.filterSection,
            {
              backgroundColor: isFilterOpen ? '#e60023' : '#ffffff',
            },
          ]}
        >
          <Image
            source={require('../assets/image/filterIcon.png')}
            style={{
              height: 28,
              width: 28,
              tintColor: isFilterOpen ? '#fff' : '#888',
            }}
          />

          {/* <Ionicons
            name="filter-outline"
            size={20}
            color={isFilterOpen ? '#fff' : '#444'}
          /> */}
        </TouchableOpacity>
      </View>

      {/* search component render when press button of search-filter */}
      {isFilterOpen && (
        <SearchComponent
          setSelectedFilters={setSelectedFilters}
          onClear={() =>
            setSelectedFilters({
              tehsil: null,
              ageing: null,
              paymentType: null,
              salesman: null,
              retailStatus: null,
            })
          }
          onSearch={() => setIsFilterOpen(false)}
        />
      )}

      <View style={{ flex: 1 }}>
        {isToggle ? (
          <MAndMPage
            searchText={searchText}
            selectedFilters={selectedFilters}
            type="MM"
          />
        ) : (
          <DealerShipPage
            searchText={searchText}
            selectedFilters={selectedFilters}
            type="DealerShip"
          />
        )}
      </View>
    </View>
  );
}

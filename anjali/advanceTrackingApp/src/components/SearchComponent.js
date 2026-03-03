import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../assets/css/style';
import { dropdowndata } from '../Data/data';
import ReusableDropdown from './DropDownComponent';

export default function SearchComponent({
  setSelectedFilters,
  onSearch,
  onClear,
}) {
  const [filters, setFilters] = useState({
    tehsil: null,
    ageing: null,
    paymentType: null,
    salesman: null,
    retailStatus: null,
  });

  const handleClear = () => {
    const empty = {
      tehsil: null,
      ageing: null,
      paymentType: null,
      salesman: null,
      retailStatus: null,
    };

    setFilters(empty);
    setSelectedFilters(empty);
    onClear();
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.row}>
        <ReusableDropdown
          label="Tehsil"
          data={dropdowndata.tehsil}
          value={filters.tehsil}
          onChange={value => setFilters({ ...filters, tehsil: value })}
        />

        <ReusableDropdown
          label="Ageing"
          data={dropdowndata.ageing}
          value={filters.ageing}
          onChange={value => setFilters({ ...filters, ageing: value })}
        />

        <ReusableDropdown
          label="Payment"
          data={dropdowndata.paymentType}
          value={filters.paymentType}
          onChange={value => setFilters({ ...filters, paymentType: value })}
        />
      </View>

      <ReusableDropdown
        label="Salesman"
        data={dropdowndata.Salesman}
        value={filters.salesman}
        onChange={value => setFilters({ ...filters, salesman: value })}
        isFull
      />

      <ReusableDropdown
        label="Retail Status"
        data={dropdowndata.RetailStatus}
        value={filters.retailStatus}
        onChange={value => setFilters({ ...filters, retailStatus: value })}
        isFull
      />

      <TouchableOpacity onPress={handleClear}>
        <Text style={styles.clearBtn}>Clear</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.searchBtn}
        onPress={() => {
          setSelectedFilters(filters);
          onSearch();
        }}
      >
        <Text style={{ color: '#fff' }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

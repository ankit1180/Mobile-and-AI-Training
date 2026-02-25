import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import SearchPage from '../components/SearchPage';
import ModelPage from '../components/ModelPage';
import FavouritePage from '../components/FavouritePage';
import ModelDetailsPage from '../components/ModelDetailsPage';
import { styles } from '../assets/css/style';
import CustomHeader from '../header/CustomHeader';
import CompareVariants from '../components/CompareVariants';
export default function HomeScreen() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [favorites, setFavorites] = useState([null, null, null, null]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Tractor Guide App" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search section */}
        <SearchPage />
        {/* Model Section */}
        <ModelPage
          // Two condition passed
          onModelSelect={model => {
            setSelectedModel(model);
            setShowCompare(false);
          }}
          onSectionTouch={() => {
            setSelectedModel(null);
            setShowCompare(false);
          }}
        />

        {/* Show Favourite only when no model selected */}
        {!selectedModel && (
          <FavouritePage favorites={favorites} setFavorites={setFavorites} />
        )}

        {/* Show Model Details */}
        {selectedModel && !showCompare && (
          <ModelDetailsPage
            model={selectedModel}
            onBack={() => setSelectedModel(null)}
            onCompare={() => setShowCompare(true)}
          />
        )}

        {/* Show Compare Variants */}
        {selectedModel && showCompare && (
          <CompareVariants
            model={selectedModel}
            onBack={() => setShowCompare(false)}
          />
        )}
      </ScrollView>
    </View>
  );
}

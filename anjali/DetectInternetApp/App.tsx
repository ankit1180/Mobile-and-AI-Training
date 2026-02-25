import React from 'react';
import { View } from 'react-native';
import NetInfo from './src/Internet/NetInfo';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <NetInfo />
    </View>
  );
}

export default App;

import React from 'react';
import { View, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSignOut, selectUserName } from '../redux/slice/authSlice';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  return (
    <View>
      <Text>Welcome {userName}</Text>

      <Button
        title="Logout"
        onPress={() => dispatch(setSignOut())}
      />
    </View>
  );
};

export default DashboardScreen;

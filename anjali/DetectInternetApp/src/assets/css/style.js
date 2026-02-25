import { Activity } from 'react';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#bbf5f6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  name: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

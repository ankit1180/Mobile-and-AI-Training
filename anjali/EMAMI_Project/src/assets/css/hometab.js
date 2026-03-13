import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
  },

  tabText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'blue',
    marginTop: 200,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  navItem: {
    alignItems: 'center',
  },

  text: {
    color: '#9E9E9E',
    fontSize: 12,
  },
});

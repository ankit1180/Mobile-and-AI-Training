import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  leftText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTextTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 15,
  },
  arrowStyle: {
    color: 'white',
    fontSize: 25,
  },
  title: {
    position: 'relative',
  },
  cartImage: {
    width: 24,
    height: 24,
  },
  cartCountArea: {
    position: 'absolute',
    right: -6,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartCountText: {
    color: 'white',
    fontSize: 10,
  },
});

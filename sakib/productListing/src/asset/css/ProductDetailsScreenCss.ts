import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  screen: {
   flex: 1,
    backgroundColor: '#f7f7f7',
  },

  container: {
    padding: 20,
    paddingBottom: 120,
  },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 280,
    borderRadius: 14,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },

  category: {
    fontSize: 15,
    color: '#888',
    marginVertical: 6,
  },

  price: {
    fontSize: 24,
    color: '#27ae60',
    fontWeight: 'bold',
    marginVertical: 8,
  },

  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginTop: 10,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 15,
  },

  addButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  qtyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },

  qtyButton: {
    paddingHorizontal: 12,
  },

  qtyText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  qtyNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },

  cartButton: {
    backgroundColor: '#1971c2',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
  },

  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


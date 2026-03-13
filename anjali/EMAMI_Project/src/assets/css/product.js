import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#125bd9',
  },

  input: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },

  imageContainer: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageText: {
    marginTop: 5,
    color: '#888',
    fontSize: 14,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageText: {
    color: '#888',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  addBtn: {
    backgroundColor: '#125bd9',
    padding: 12,
    borderRadius: 10,
    margin: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#152523',
    padding: 10,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#d5f6ef',
    borderWidth: 0.5,
  },

  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },

  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#125bd9',
    marginTop: 3,
  },

  stock: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
  },

  btnText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },

  // stockEditRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 8,
  // },

  // stockInput: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   paddingHorizontal: 8,
  //   paddingVertical: 4,
  //   borderRadius: 6,
  //   width: 70,
  //   marginRight: 10,
  // },

  // saveBtn: {
  //   paddingHorizontal: 12,
  //   paddingVertical: 6,
  //   borderRadius: 6,
  // },

  // saveText: {
  //   color: 'black',
  //   fontWeight: '600',
  // },

  onAddStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    marginTop: 30,
  },

  button: {
    backgroundColor: '#125bd9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  cancelBtn: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 33,
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
});

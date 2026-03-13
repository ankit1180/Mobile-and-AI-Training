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

  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },

  onAddStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    marginTop: 30,
    marginBottom: 25,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },

  addBtn: {
    backgroundColor: '#125bd9',
    padding: 12,
    borderRadius: 10,
    margin: 20,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    shadowColor: '#152523',
    padding: 13,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#d5f6ef',
    borderWidth: 0.5,
    gap: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  row: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
    // alignSelf: 'center',
  },

  disabledInput: {
    backgroundColor: '#e0e0e0',
  },

  editBtn: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },

  deleteBtn: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },

  btnText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

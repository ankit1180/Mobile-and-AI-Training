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

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  addBtn: {
    backgroundColor: '#125bd9',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 14,
    shadowOpacity: 0.1,
    elevation: 2,
    shadowRadius: 4,
    shadowColor: '#152523',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#125bd9',
    marginTop: 3,
  },

  deleteBtn: {
    borderRadius: 5,
    marginTop: 8,
    alignSelf: 'flex-start',
  },

  btnText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },

  dateInput: {
    flex: 1,
    paddingVertical: 10,
    color: 'black',
  },
});

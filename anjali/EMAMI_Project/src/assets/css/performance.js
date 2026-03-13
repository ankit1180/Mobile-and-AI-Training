import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fullCard: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  grid2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  grid3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallCard: {
    width: '33%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  bigText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 12,
    marginTop: 5,
    color: '#777',
  },
});

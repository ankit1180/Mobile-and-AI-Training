import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 2,
  },

  image: {
    height: 150,
    width: 250,
  },

  titleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },

  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flex: 1,
  },

  titleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e60023',
  },

  titleBrand: {
    marginTop: 4,
    fontSize: 13,
    color: '#777',
    fontWeight: 'bold',
  },

  right: {
    flexDirection: 'row',
  },

  iconBox: {
    alignItems: 'center',
    marginLeft: 20,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    marginTop: 4,
    fontSize: 10,
    color: '#777',
    fontWeight: 'bold',
  },

  divider: {
    height: 2,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
  },

  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  variantTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  compareText: {
    color: '#e60023',
    fontWeight: 'bold',
    fontSize: 13,
  },

  variant: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
  },

  variantText: {
    fontSize: 12,
    color: '#555',
  },

  selectedVariant: {
    borderWidth: 1.5,
    borderColor: '#e60023',
  },

  selectedVariantText: {
    fontSize: 12,
    color: '#e60023',
    fontWeight: 'bold',
  },

  specCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
  },

  specTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  specLabel: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },

  specValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
});

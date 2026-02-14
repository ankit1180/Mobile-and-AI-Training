import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f3f5',
  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  productInfo: {
    padding: 14,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 20,
  },
  categoryContainer: {
    backgroundColor: '#e7f5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#1971c2',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2b8c3e',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1971c2',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#868e96',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#212529',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  qtyContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#eee',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginTop: 8,
},

qtyButton: {
  paddingHorizontal: 10,
  paddingVertical: 4,
},

qtyText: {
  fontSize: 20,
  fontWeight: 'bold',
},

qtyNumber: {
  fontSize: 16,
  fontWeight: 'bold',
  marginHorizontal: 8,
},

});
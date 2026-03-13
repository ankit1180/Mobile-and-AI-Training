import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  successBanner: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 8,
    borderRadius: 10,
    zIndex: 999,
    elevation: 5,
  },

  successBannerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
  },
  buttonChange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 1,
  },

  button: {
    borderRadius: 20,
    backgroundColor: '#1E5ACD',
    color: 'white',
    padding: 7,
    paddingHorizontal: 20,
  },

  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },

  progressStyle: {
    flexDirection: 'row',
    gap: 7,
  },

  progressBtn: {
    borderRadius: 20,
    backgroundColor: '#1E5ACD',
    color: 'white',
    padding: 4,
    fontSize: 13,
    paddingHorizontal: 4,
  },

  progressDisable: {
    borderRadius: 20,
    borderColor: '#96f2f7',
    backgroundColor: '#dff5f7',
    borderWidth: 2,
    padding: 4,
    fontSize: 13,
    paddingHorizontal: 4,
  },

  statusMapContainer: {
    padding: 10,
  },

  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusShow: {
    flexDirection: 'row',
    gap: 25,
  },

  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },

  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  storeName: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  iconRow: {
    flexDirection: 'row',
    gap: 10,
  },

  channelRow: {
    flexDirection: 'row',
    gap: 25,
    marginBottom: 8,
  },

  label: {
    fontSize: 11,
    color: '#777',
  },

  value: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  address: {
    fontSize: 12,
    color: '#555',
    flex: 1,
    marginRight: 10,
  },

  checkBtn: {
    backgroundColor: '#1E5ACD',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 13,
    fontSize: 12,
  },

  checkOutBtn: {
    backgroundColor: '#1E5ACD',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 13,
    fontSize: 12,
  },

  checkBtnDisabled: {
    backgroundColor: '#ccc',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 13,
    fontSize: 12,
  },
});

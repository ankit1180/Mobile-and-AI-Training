import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  dropdownText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },

  activeLeft: {
    backgroundColor: '#2F5DD1',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },

  activeRight: {
    backgroundColor: '#2F5DD1',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },

  inactiveLeft: {
    backgroundColor: '#EAEAEA',
  },

  inactiveRight: {
    backgroundColor: '#EAEAEA',
  },

  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  inactiveText: {
    color: '#888',
    fontWeight: 'bold',
  },
  beatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  scheduleBox: {
    backgroundColor: '#ECF5F4',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '36%',
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  scheduleText: {
    color: '#107b98',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },

  storeBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: '60%',
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  storeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  storeSub: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  logoImage: {
    position: 'absolute',
    top: 5,
    right: 0,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  bigText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  bigGreenText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28B463',
  },

  cardLabel: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 6,
  },

  smallText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  fullCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1.5,
    paddingVertical: 25,
    borderColor: '#eaf2f1',
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#e60023',
    borderBottomWidth: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderBottomStartRadius: 20,
    // borderBottomEndRadius: 20,
    marginTop: -10,
  },
  navBackArrow: {
    position: 'absolute',
    left: 16,
    top: 42,
  },
  navBackText: {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: '300',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 90,
    justifyContent: 'center',
    height: 42,
    alignSelf: 'center',
  },

  searchInput: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingVertical: 0,
  },

  // brand page
  brandCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },

  brandLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },

  dropdown: {
    height: 42,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  //favourite page
  favCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  favHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  favTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  divider: {
    height: 3,
    backgroundColor: '#bdbaba',
    marginVertical: 12,
  },

  favMessage: {
    fontSize: 13,
    color: '#9e9e9e',
    lineHeight: 18,
    textAlign: 'center',
  },
});

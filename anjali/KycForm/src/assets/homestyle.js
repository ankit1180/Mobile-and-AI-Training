import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  navcontainer: {
    backgroundColor: '#1a1a1a',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomColor: '#e60023',
    borderBottomWidth: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  navBackArrow: {
    position: 'absolute',
    left: 16,
    bottom: 14,
    zIndex: 1,
  },
  navBackText: {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: '300',
    marginRight: 10,
  },
  navTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },

  formContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  formScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  //  Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
    marginLeft: 6,
  },
  sectionChevron: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 6,
    marginTop: 14,
  },
  requiredStar: {
    color: '#e60023',
    fontWeight: '700',
  },

  inputPlaceholder: {
    color: '#999999',
  },

  inputEditable: {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Picker
  pickerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  pickerContainer: {
    height: 50,
    color: '#999',
  },

  row: {
    marginBottom: 4,
  },
  halfRow: {
    width: '100%',
  },

  nextButton: {
    backgroundColor: '#f4a0a0',
    paddingVertical: 16,
    borderRadius: 30,
    marginHorizontal: 40,
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    marginBottom: 15,
  },
  summaryTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
  },

  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  textValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 6,
    marginTop: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 22,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

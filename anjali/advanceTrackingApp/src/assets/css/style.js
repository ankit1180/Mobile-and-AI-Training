import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // custom header style
  header: {
    backgroundColor: 'red',
    paddingBottom: 4,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  safeView: {
    backgroundColor: 'black',
    paddingTop: 30,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -10,
  },

  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  iconStyle: {
    color: 'white',
    fontSize: 23,
  },

  navTitle: {
    color: 'white',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 7,
    fontWeight: 'bold',
  },

  activeButton: {
    borderColor: '#e60023',
    color: 'red',
  },

  activeText: {
    color: '#e60023',
    fontWeight: 'bold',
  },

  // Subheader style
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },

  leftSection: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    borderWidth: 1,
    borderColor: '#dbd8d8',
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 19,
    backgroundColor: '#ffffff',
  },
  buttonColor: {
    color: '#888',
  },

  rightSection: {
    flexDirection: 'row',
    gap: 10,
  },

  rightDivider: {
    height: 38,
    backgroundColor: 'black',
    width: 1,
    marginRight: 12,
  },

  rightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  summaryText: {
    color: 'blue',
    fontWeight: 'bold',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 8,
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: '#dbd8d8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 40,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#000',
  },

  filterSection: {
    marginLeft: 10,
    height: 41,
    width: 45,
    borderWidth: 1,
    borderColor: '#dbd8d8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  // first screen
  card: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#dbd8d8',
  },

  cardHeading: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  callButton: {
    backgroundColor: '#dbd8d8',
    borderRadius: 30,
    padding: 8,
  },
  text: {
    fontSize: 11,
    color: '#767676',
  },
  value: {
    fontSize: 11,
    color: 'black',
  },
  days: {
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: '#767676',
    width: 210,
    marginTop: 5,
  },

  // OD days style
  daysBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ff8c00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  daysBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // search dropdown component
  filterContainer: {
    marginHorizontal: 15,
    borderRadius: 14,
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  col: {
    flex: 1,
    marginRight: 8,
  },

  fullRow: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },

  dropdown: {
    paddingVertical: 11,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#dbd8d8',
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },

  dropdownFull: {
    paddingVertical: 11,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#dbd8d8',
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  clearBtn: {
    color: '#e60023',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'red',
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 2,
  },

  searchBtn: {
    backgroundColor: '#e60023',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
  },

  // details screen style
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  customerName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  statusBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 5,
    alignSelf: 'flex-start',
  },

  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  callCircle: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailsCol: {
    width: '48%',
  },

  labeldata: {
    color: '#888',
    fontSize: 13,
    marginTop: 15,
  },

  valuedata: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },

  valuedate: {
    color: 'red',
    fontWeight: 'bold',
  },

  menuCardActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },

  // follow up history screen style
  timelineSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  timelineLeft: {
    width: 40,
    alignItems: 'center',
  },

  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#43bf27',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  upcomingCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f38334',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  timelinedivider: {
    position: 'absolute',
    top: 12,
    bottom: -30,
    width: 1,
    backgroundColor: '#777373',
  },

  dateBadge: {
    backgroundColor: '#43bf27',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },

  dateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  upcomingBadge: {
    backgroundColor: '#f38334',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 10,
  },

  upcomingText: {
    color: '#fff',
    fontSize: 14,
  },

  timelineCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  dateStyle: {
    color: 'black',
    fontWeight: 'bold',
  },

  timelineTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
  },

  timelineSub: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },

  // finance Details Style
  // calendar Model style
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderRadius: 15,
    padding: 15,
  },

  closeButton: {
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },

  arrow: {
    width: 25,
  },

  inputBox: {
    paddingVertical: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputText: {
    fontSize: 16,
    color: '#000',
  },

  labelStyle: {
    color: '#777777',
    marginTop: 10,
  },

  changeMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 6,
  },

  buttonStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingLeft: 13,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },

  activeButtonStyle: {
    borderColor: '#d32f2f',
    backgroundColor: '#fdeeee',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  iconStyles: {
    color: '#888',
    marginRight: 8,
  },

  activeIconStyle: {
    color: '#d32f2f',
  },

  buttonText: {
    color: '#888',
  },

  activeText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },

  inputTextArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 6,
    padding: 15,
    fontSize: 15,
    minHeight: 120,
    textAlignVertical: 'top',
    color: 'black',
  },
  // commentContainer: {
  //   position: 'relative',
  // },
  // micIcon: {
  //   position: 'absolute',
  //   bottom: 10,
  //   right: 10,
  // },

  submitButton: {
    padding: 10,
    backgroundColor: 'red',
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  submit: {
    color: 'white',
    fontWeight: 'bold',
  },

  // finance section
  dropdownFinance: {
    paddingVertical: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 8,
    color: '#ddd',
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },

  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },

  stageContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  stageButton: {
    width: 43,
    height: 39,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 10,
    marginBottom: 10,
  },

  activeStageButton: {
    backgroundColor: '#51c454',
  },

  stageText: {
    color: '#777',
    fontWeight: '500',
  },

  activeStageText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  stageMessage: {
    color: 'red',
    fontSize: 12,
  },

  successContainer: {
    position: 'absolute',
    top: 40,
    left: 25,
    right: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c4eac5',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 8,
    zIndex: 1000,
  },

  successText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: 'bold',
  },

  showcheck: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4e9b51',
    borderWidth: 2,
    borderColor: '#47894a',
    borderRadius: 15,
  },

  // error container message
  errorContainer: {
    position: 'absolute',
    top: 40,
    left: 25,
    right: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 8,
    zIndex: 1000,
  },

  errorText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: 'bold',
  },

  errorIcon: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#b00020',
    borderWidth: 2,
    borderColor: '#b00020',
    borderRadius: 15,
  },

  // summary screen style
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f0f0',
  },

  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  summaryLabel: {
    color: '#333',
    fontSize: 14,
  },

  summaryValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  daysContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },

  dayBox: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },

  dayLabel: {
    color: '#777',
    fontSize: 12,
  },

  dayValue: {
    color: '#e60023',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  verticalDivider: {
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10,
    width: 1,
    backgroundColor: '#e0e0e0',
  },
});

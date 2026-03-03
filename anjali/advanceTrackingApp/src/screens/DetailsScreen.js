import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/css/style';
import CustomHeader from '../header/CustomHeader';
import { phoneCall } from '../helper/util';
import { useNavigation } from '@react-navigation/native';

import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { formatDatePicker } from '../helper/util';
import { Dropdown } from 'react-native-element-dropdown';
import { financeData } from '../Data/data';
import { formatDate } from '../helper/util';

export default function DetailsScreen({ route }) {
  const { item, type } = route.params;
  const navigation = useNavigation();

  const [activeSection, setActiveSection] = useState(null);
  // const [setDate, setCurrentDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  // const [selectedDate, setSelectedDate] = useState(
  //   item?.expectedRetailDate || new Date().toISOString().split('T')[0],
  // );

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  //for changing mode
  const [isToggle, setIsToggle] = useState(true);
  const [selectedFinancer, setSelectedFinancer] = useState(null);
  const [selectedTenure, setSelectedTenure] = useState(null);
  const [selectedStage, setSelectedStage] = useState(0);

  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');

  const [message, setMessage] = useState(null);
  // const [requiredError, setRequiredError] = useState(false);

  const invoiceValue =
    type === 'MM' ? item.invoiceValueMM : item.invoiceValueDealerShip;
  const balanceForRetail =
    type === 'MM' ? item.balanceForRetailMM : item.balanceForRetailDealerShip;
  const labelName = type === 'MM' ? 'M&M' : 'DealerShip';

  // initialDate of expected date route
  // const initialDate = item?.expectedRetailDate;

  const financerList = financeData.financier.map(item => ({
    label: item,
    value: item,
  }));

  const tenureList = financeData.loanTenure.map(item => ({
    label: item.toString(),
    value: item.toString(),
  }));

  const stageMessages = {
    1: 'Stage 1: KYC Documents available',
    2: 'Stage 2: Bank/NBFC finalization',
    3: 'Stage 3: FI Completion (Positive)',
    4: 'Stage 4: Funding approval by Bank/NBFC',
    5: 'Stage 5: Full margin money received',
    6: 'Stage 6: Dealer document submission to financier',
  };

  console.log('StageMessage', stageMessages);

  // handle Submit function
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = () => {
    if (isToggle) {
      if (!comment?.trim()) {
        setMessage({
          type: 'error',
          text: 'Follow-Up Comment is required',
        });
        return;
      }
    }

    if (!isToggle) {
      const validations = [
        {
          condition: !selectedFinancer,
          message: 'Please select Financer',
        },
        {
          condition: !amount || Number(amount) <= 0,
          message: 'Funding Amount cannot be zero',
        },
        {
          condition: !selectedTenure,
          message: 'Please select Loan Tenure',
        },
        {
          condition: !selectedStage,
          message: 'Please select Retail Stage',
        },
        {
          condition: !comment?.trim(),
          message: 'Follow-Up Comment is required',
        },
      ];

      const error = validations.find(v => v.condition);

      if (error) {
        setMessage({ type: 'error', text: error.message });
        return;
      }
    }

    setMessage({
      type: 'success',
      text: 'Finance Detail updated',
    });
  };
  // calendar modal
  const CalendarModal = () => {
    return (
      <Modal
        isVisible={calendarVisible}
        transparent
        onBackdropPress={() => setCalendarVisible(false)}
        backdropOpacity={0.5}
        style={{ justifyContent: 'center', margin: 20 }}
      >
        <View style={styles.calendarContainer}>
          <Calendar
            enableSwipeMonths={true}
            hideArrows={false}
            renderArrow={direction => (
              <Text style={styles.arrow}>
                {direction === 'left' ? (
                  <Ionicons name="arrow-back" size={20} color="#E31937" />
                ) : (
                  <Ionicons name="arrow-forward" size={20} color="#E31937" />
                )}
              </Text>
            )}
            current={selectedDate}
            onDayPress={day => {
              setSelectedDate(day.dateString);
              setCalendarVisible(false);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#E53935',
              },
            }}
            theme={{
              arrowColor: '#E53935',
              selectedDayTextColor: '#fff',
              monthTextColor: '#e31937',
              textMonthFontSize: 18,
              textMonthFontWeight: 'bold',
              textSectionTitleColor: 'black',
            }}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCalendarVisible(false)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const DetailSection = () => (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsRow}>
        <View style={styles.detailsCol}>
          <Text style={styles.labeldata}>Enquiry ID</Text>
          <Text style={styles.valuedata}>{item.id}</Text>
          <Text style={styles.labeldata}>Tractor Serial Number</Text>
          <Text style={styles.valuedata}>{item.serialNumber}</Text>
          <Text style={styles.labeldata}>Block</Text>
          <Text style={styles.labeldata}>Date of Delivery</Text>
          <Text style={styles.valuedata}>{formatDate(item.deliveryDate)}</Text>
          <Text style={styles.labeldata}>Balance for Retail ({labelName})</Text>
          <Text style={styles.valuedata}>₹{balanceForRetail}</Text>

          {/* dealership balance*/}
          {type === 'MM' && (
            <>
              <Text style={styles.labeldata}>Invoice Value(Dealer)</Text>
              <Text style={styles.valuedata}>
                {' '}
                ₹{item.balanceForRetailDealerShip}{' '}
              </Text>
            </>
          )}
        </View>

        <View style={styles.detailsCol}>
          <Text style={styles.labeldata}>Tractor Model</Text>
          <Text style={styles.valuedata}>{item.tractorModel}</Text>
          <Text style={styles.labeldata}>Tehsil</Text>
          <Text style={styles.valuedata}>{item.tehsil}</Text>

          <Text style={styles.labeldata}>Village</Text>
          <Text style={styles.valuedata}>{item.village}</Text>

          <Text style={styles.labeldata}>Invoice Value ({labelName})</Text>
          <Text style={styles.valuedata}>₹{invoiceValue}</Text>
          <Text style={styles.labeldata}>Follow Up Due Date</Text>
          <Text style={styles.valuedate}>
            {formatDate(item.followUpDueDate)}
          </Text>
        </View>
      </View>
    </View>
  );

  // finance details for section
  const FinanceSection = () => {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.labelStyle}>
          Expected Retail Date <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.inputText}>
            {formatDatePicker(item.expectedRetailDate)}
          </Text>
          <Ionicons name="calendar-outline" size={22} color="#777" />
        </TouchableOpacity>

        <Text style={styles.labelStyle}>Payment Mode</Text>

        <View style={styles.changeMode}>
          <TouchableOpacity
            onPress={() => setIsToggle(true)}
            style={[styles.buttonStyle, isToggle && styles.activeButtonStyle]}
          >
            <View style={styles.row}>
              <Ionicons
                name="cash-outline"
                size={22}
                style={[styles.iconStyles, isToggle && styles.activeIconStyle]}
              />
              <Text style={[styles.buttonText, isToggle && styles.activeText]}>
                Cash
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsToggle(false)}
            style={[styles.buttonStyle, !isToggle && styles.activeButtonStyle]}
          >
            <View style={styles.row}>
              <Ionicons
                name="card-outline"
                size={22}
                style={[styles.iconStyles, !isToggle && styles.activeIconStyle]}
              />
              <Text style={[styles.buttonText, !isToggle && styles.activeText]}>
                Finance
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* finance field */}
        {!isToggle && (
          <>
            {/* Financer Dropdown */}
            <Text style={styles.labelStyle}>
              Financer <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <Dropdown
              style={styles.dropdownFinance}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{ color: '#888', fontSize: 14 }}
              data={financerList}
              search
              containerStyle={{ borderRadius: 8, marginTop: -46 }}
              searchPlaceholder="Search"
              searchPlaceholderTextColor="#ddd"
              labelField="label"
              valueField="value"
              placeholder="Select Financer"
              inputSearchStyle={{
                borderColor: 'gray',
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
              }}
              value={selectedFinancer}
              onChange={item => setSelectedFinancer(item.value)}
            />

            {/* Funding Amount */}
            <Text style={styles.labelStyle}>
              Funding Amount <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TextInput
              placeholder="₹ Enter amount in Rupees"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={amount}
              onChangeText={text => setAmount(text)}
              style={[styles.inputBox, styles.inputText]}
            />

            {/* Loan Tenure Dropdown */}
            <Text style={styles.labelStyle}>
              Loan Tenure <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <Dropdown
              style={styles.dropdownFinance}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{ color: '#888', fontSize: 14 }}
              containerStyle={{ borderRadius: 8, marginTop: -46 }}
              data={tenureList}
              search
              searchPlaceholder="Search"
              searchPlaceholderTextColor="#ddd"
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="Select Tenure"
              inputSearchStyle={{
                borderColor: 'gray',
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
              }}
              value={selectedTenure}
              onChange={item => setSelectedTenure(item.value)}
            />
            {/* File Sent to Financer On */}
            <Text style={styles.labelStyle}>
              File Sent to Financer On <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setCalendarVisible(true)}
            >
              <Text style={styles.inputText}>
                {formatDatePicker(selectedDate)}
              </Text>

              <Ionicons name="calendar-outline" size={22} color="#777" />
            </TouchableOpacity>
            <Text style={styles.labelStyle}>
              Retail Stage <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <View style={styles.stageContainer}>
              {[1, 2, 3, 4, 5, 6].map(stage => (
                <TouchableOpacity
                  key={stage}
                  style={[
                    styles.stageButton,
                    stage <= selectedStage && styles.activeStageButton,
                  ]}
                  onPress={() => setSelectedStage(stage)}
                >
                  <Text
                    style={[
                      styles.stageText,
                      stage <= selectedStage && styles.activeStageText,
                    ]}
                  >
                    S{stage}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* debug fo message showing */}
            {/* <Text>SelectedStage:{selectedStage}</Text> */}
            {/* <Text>StageMessage:{stageMessages}</Text> */}

            {selectedStage > 0 && (
              <Text style={styles.stageMessage}>
                {stageMessages?.[selectedStage]}
              </Text>
            )}
          </>
        )}

        <Text style={styles.labelStyle}>
          Follow-Up Comment <Text style={{ color: 'red' }}>*</Text>
        </Text>

        <TextInput
          multiline
          value={comment}
          onChangeText={setComment}
          placeholder="Add Remarks Here"
          placeholderTextColor="#999"
          style={styles.inputTextArea}
        />

        {/* submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f2f2' }}>
      <CustomHeader
        title="Advance Tracker"
        name={item.name}
        status={item.status}
        showProfile={true}
        mobile={item.mobile}
        onCall={phoneCall}
        // for message showing on the header
        // showMessage={showSuccess}
      />

      {/* {showSuccess && (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark" style={styles.showcheck} />
          <Text style={styles.successText}>Finance Detail updated</Text>
        </View>
      )} */}

      {message && (
        <View
          style={
            message.type === 'success'
              ? styles.successContainer
              : styles.errorContainer
          }
        >
          <Ionicons
            name={message.type === 'success' ? 'checkmark' : 'close'}
            style={
              message.type === 'success' ? styles.showcheck : styles.errorIcon
            }
          />
          <Text
            style={
              message.type === 'success' ? styles.successText : styles.errorText
            }
          >
            {message.text}
          </Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.menuCard,
            activeSection === 'details' && styles.menuCardActive,
          ]}
          onPress={() =>
            setActiveSection(activeSection === 'details' ? null : 'details')
          }
        >
          <Text style={styles.menuText}>Details</Text>
          <Ionicons
            name={
              activeSection === 'details' ? 'chevron-down' : 'chevron-forward'
            }
            size={20}
            color="#777"
          />
        </TouchableOpacity>

        {activeSection === 'details' && <DetailSection />}

        {/* follow up screen */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Follow-Up', { item })}
        >
          <Text style={styles.menuText}>Follow-Up History</Text>
          <Ionicons name="chevron-forward" size={20} color="#777" />
        </TouchableOpacity>

        {/* Finance Details Section*/}
        <TouchableOpacity
          style={[
            styles.menuCard,
            activeSection === 'financeForm' && styles.menuCardActive,
          ]}
          onPress={() =>
            setActiveSection(
              activeSection === 'financeForm' ? null : 'financeForm',
            )
          }
        >
          <Text style={styles.menuText}>Finance Details</Text>
          <Ionicons
            name={
              activeSection === 'financeForm'
                ? 'chevron-down'
                : 'chevron-forward'
            }
            size={20}
            color="#777"
          />
        </TouchableOpacity>
        {activeSection === 'financeForm' && <FinanceSection />}

        {/* calendar model */}
        <CalendarModal />
      </ScrollView>
    </View>
  );
}

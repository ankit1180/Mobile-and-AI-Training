import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Navbar from './Navbar';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import Summary from './Summary';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm } from '../redux/formSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [stepIndex, setStepIndex] = useState(1);

  const { personal, address } = useSelector(state => state.form);

  const step1HasErrors =
    !personal.firstName ||
    !personal.lastName ||
    !personal.fullName ||
    !personal.email ||
    !personal.phone;

  const step2HasErrors =
    !address.street || !address.city || !address.state || !address.pincode;

  const handleNextStep1 = () => {
    if (step1HasErrors) {
      Alert.alert('Error', 'Please fill all required fields');
    } else {
      setStepIndex(2);
    }
  };

  const handleNextStep2 = () => {
    if (step2HasErrors) {
      Alert.alert('Error', 'Please fill all required fields');
    } else {
      setStepIndex(3);
    }
  };

  const handlePrevious = () => {
    setStepIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Application Submitted Successfully!');
    dispatch(resetForm());
    setStepIndex(1);
  };

  const progressStepsStyle = {
    completedProgressBarColor: '#2ecc71',
    completedStepIconColor: '#2ecc71',
    completedCheckColor: '#ffffff',
    activeStepIconBorderColor: '#e60023',
    activeStepIconColor: '#ffffff',
    activeLabelColor: '#e60023',
    activeStepNumColor: '#e60023',
    disabledStepIconColor: '#cccccc',
    disabledLabelColor: '#999999',
    progressBarColor: '#cccccc',
    labelFontSize: 12,
    activeLabelFontSize: 12,
    topOffset: 20,
    marginBottom: 10,
  };

  const nextBtnStyle = {
    backgroundColor: '#f4a0a0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 60,
  };

  const nextBtnTextStyle = {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  };

  const prevBtnStyle = {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 60,
  };

  const prevBtnTextStyle = {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <Navbar />
      <View style={{ flex: 1 }}>
        <ProgressSteps activeStep={stepIndex - 1} {...progressStepsStyle}>
          <ProgressStep label="Personal" removeBtnRow>
            {stepIndex === 1 && <FirstForm />}

            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity style={nextBtnStyle} onPress={handleNextStep1}>
                <Text style={nextBtnTextStyle}>Next</Text>
              </TouchableOpacity>
            </View>
          </ProgressStep>

          <ProgressStep label="Address" removeBtnRow>
            {stepIndex === 2 && <SecondForm />}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity style={prevBtnStyle} onPress={handlePrevious}>
                <Text style={prevBtnTextStyle}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={nextBtnStyle} onPress={handleNextStep2}>
                <Text style={nextBtnTextStyle}>Next</Text>
              </TouchableOpacity>
            </View>
          </ProgressStep>

          <ProgressStep label="Review" removeBtnRow>
            {stepIndex === 3 && <Summary />}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity style={prevBtnStyle} onPress={handlePrevious}>
                <Text style={prevBtnTextStyle}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={nextBtnStyle} onPress={handleSubmit}>
                <Text style={nextBtnTextStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
}

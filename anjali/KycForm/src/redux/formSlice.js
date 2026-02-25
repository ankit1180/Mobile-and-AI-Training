import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personal: {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    alternateEmail: '',
    phone: '',
    selectedGender: 'male',
    selectedStatus: 'single',
    selectedPhoneType: 'mobile',
    dob: '',
    nationality: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    pincode: '',
    currentStreet: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonal: (state, action) => {
      state.personal = action.payload;
    },
    saveAddress: (state, action) => {
      state.address = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { savePersonal, saveAddress, resetForm } = formSlice.actions;
export default formSlice.reducer;

import { Linking, Platform } from 'react-native';

export const phoneCall = phone => {
  if (!phone) return;
  const phoneNumber =
    Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  console.log('phone.....', phone);
  Linking.openURL(phoneNumber).catch(err => {
    console.log('Error', err);
  });
};

export const formatDate = date => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
};

export const formatDatePicker = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

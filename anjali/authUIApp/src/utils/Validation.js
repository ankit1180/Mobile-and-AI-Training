//validation method for email and password
export const validate = {
  email: value => {
    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;
    if (!pattern.test(value)) {
      console.log('Email must be valid', value);
      return 'Email must be valid';
    }
    return '';
  },
  password: value => {
    const pattern =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,16}$/;

    if (!pattern.test(value)) {
      console.warn('Password must be valid', value);
      return 'Password must be unique';
    }
    return '';
  },
};

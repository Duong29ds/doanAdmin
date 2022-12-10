import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const  SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
    phonenumber: Yup.string()
    .required('Phone is required'),
    address: Yup.string()
    .required('Address is required'),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

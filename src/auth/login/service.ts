import axios from 'src/common/utils/axios';
import { IAuth, ISignUp } from './interface';

export const getAuth = (params: IAuth) => {
  return axios.post('user/signin', params);
};

export const getSignup = (params: ISignUp) => {
  return axios.post('user/signup', params);
};

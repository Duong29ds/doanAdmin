import axios from 'src/utils/axios';
import { IAuth } from './interface';

export const getAuth = (params: IAuth) => {
  return axios.post('admin/login', params);
};

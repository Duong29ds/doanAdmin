import axios from 'src/common/utils/axios';
import { IAddSupplier, IDeleteSupplier, IUpdateSupplier } from './\binterface';

export const addSup = (params: IAddSupplier) => {
  console.log(params,'params');
  return axios.post('supplier/new', params);
};

export const updateSup=(params: IUpdateSupplier)=>{
  return axios.patch(`supplier/update/${params.id}`, params);
}

export const deleteSup=(params: IDeleteSupplier)=>{
  return axios.delete('supplier/delete', {data:params});
}

export const fetchingSuppliers=()=>{
    return axios.get('supplier/list')
}

export const fetchingSupplierById=(id: string|undefined)=>{
  return axios.get(`supplier/${id}`)
}
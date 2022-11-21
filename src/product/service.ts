import axios from 'src/common/utils/axios';
import { IDeleteSupplier } from 'src/supply/\binterface';
import { IAddProduct, IUpdateProduct } from './interface';

export const fetchingProducts=()=>{
    return axios.get('product/list')
}

export const addProd=(params: IAddProduct) => {
    return axios.post('product/new', params);
};

export const deleteProd=(params: IDeleteSupplier)=>{
    return axios.delete('product/delete', {data:params});
}

export const fetchingProductById=(id: string|undefined)=>{
    return axios.get(`product/${id}`)
}

export const updateProd=(params: IUpdateProduct)=>{
    return axios.patch(`product/update/${params.id}`, params);
}
  
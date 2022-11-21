import axios from 'src/common/utils/axios';
import { IAddSupplier, IDeleteSupplier } from "src/supply/\binterface";
import { IUpdatePortfolio } from './\binterface';

export const updatePortf=(params: IUpdatePortfolio)=>{
    return axios.patch(`portfolio/update/${params.id}`, params);
  }

export const deletePortf=(params: IDeleteSupplier)=>{
    return axios.delete('portfolio/delete', {data:params});
  }

export const fetchingPortfolios=()=>{
    return axios.get('portfolio');
}

export const fetchingPortfolioById=(id: string|undefined)=>{
    return axios.get(`portfolio/${id}`)
  }

export const addPortf=(params:IAddSupplier)=>{
    return axios.post('portfolio/new',params);
}
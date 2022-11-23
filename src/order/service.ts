import axios from 'src/common/utils/axios';

export const fetchingOrders=()=>{
    return axios.get('order/list')
}
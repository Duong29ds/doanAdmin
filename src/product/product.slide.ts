import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
export type DataProduct = {
    id:number;
    name: string;
    description: string;
    import_date:Date;
    post_service:string;
    price:number;
    total:number;
}

// description
// : 
// "description keyboard"
// id
// : 
// 13
// import_date
// : 
// "2020-01-15T00:00:00.000Z"
// name
// : 
// "keyboard"
// post_service
// : 
// ""
// price
// : 
// 20000
// total
// : 
// 20

type ProductProps = {
  rows: Array<DataProduct>;
};
const ProductState: ProductProps = {
  rows: [],
};
export const productSlice = createSlice({
  name: 'product',
  initialState: ProductState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    // setDataEdit: (state, action) => {
    //     state.dataEdit = action.payload;
    //   },
  },
});

export const { setRows } = productSlice.actions;
export const rowsSelector = (state: RootState) => state.product.rows;
// export const dataEditSelector = (state: RootState) => state.product.dataEdit;

export default productSlice.reducer;

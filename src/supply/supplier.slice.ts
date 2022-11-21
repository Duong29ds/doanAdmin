import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
export type DataSupplier = {
    id:number;
    name: string;
    description: string;
}

type SupplierProps = {
  rows: Array<DataSupplier>;
  dataEdit: DataSupplier;
};
const SupplierState: SupplierProps = {
  rows: [],
  dataEdit: {id:0,name: '',description: ''},
};
export const supplierSlice = createSlice({
  name: 'supplier',
  initialState: SupplierState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setDataEdit: (state, action) => {
        state.dataEdit = action.payload;
      },
  },
});

export const { setRows,setDataEdit } = supplierSlice.actions;
export const rowsSelector = (state: RootState) => state.supplier.rows;
export const dataEditSelector = (state: RootState) => state.supplier.dataEdit;

export default supplierSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
export type DataPortfolio = {
    id:number;
    name: string;
    description: string;
}

type PortfolioProps = {
  rows: Array<DataPortfolio>;
  dataEdit: DataPortfolio;
};
const PortfolioState: PortfolioProps = {
  rows: [],
  dataEdit: {id:0,name: '',description: ''},
};
export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: PortfolioState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setDataEdit: (state, action) => {
        state.dataEdit = action.payload;
      },
  },
});

export const { setRows,setDataEdit } = portfolioSlice.actions;
export const rowsSelector = (state: RootState) => state.portfolio.rows;
export const dataEditSelector = (state: RootState) => state.portfolio.dataEdit;

export default portfolioSlice.reducer;

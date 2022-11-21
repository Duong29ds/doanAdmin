import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import portfolioSlice from 'src/portfolio/portfolio.slice';
import  productSlice from 'src/product/product.slide';
import supplierSlice from 'src/supply/supplier.slice';
// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin'],
};

const rootReducer = combineReducers({ authLogin: authLoginReducer, login: loginReducer,
   supplier: supplierSlice,
   portfolio: portfolioSlice,
   product: productSlice,
   });  

export { rootPersistConfig, rootReducer };

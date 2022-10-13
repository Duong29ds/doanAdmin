import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/pages/auth/login/auth.slice';
import loginReducer from 'src/pages/auth/login/login.slice';
// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin'],
};

const rootReducer = combineReducers({ authLogin: authLoginReducer, login: loginReducer });

export { rootPersistConfig, rootReducer };

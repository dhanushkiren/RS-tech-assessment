import { combineReducers } from '@reduxjs/toolkit';
import employeeReducer from './employee/employeeSlice';
import themeReducer from './theme/themeSlice';

const rootReducer = combineReducers({
  employees: employeeReducer,
  theme: themeReducer,
});

export default rootReducer;
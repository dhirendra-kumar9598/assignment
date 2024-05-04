import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './authSlice/authSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store;

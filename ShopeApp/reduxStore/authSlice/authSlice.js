import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  address: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = null;
      state.user = null;
    },
    authenticate: (state, action) => {
      state.token = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {login, logout, authenticate, setDeliveryAddress} =
  authSlice.actions;

// paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setPayments: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setPayments, setLoading } = paymentSlice.actions;
export default paymentSlice.reducer;

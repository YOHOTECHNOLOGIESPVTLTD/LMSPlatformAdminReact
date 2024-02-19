// customerSupportSlice.js
import { createSlice } from '@reduxjs/toolkit';

const customerSupportSlice = createSlice({
  name: 'customerSupports',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCustomerSupports: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCustomerSupports, setLoading } = customerSupportSlice.actions;
export default customerSupportSlice.reducer;

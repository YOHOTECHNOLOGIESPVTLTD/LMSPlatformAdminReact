// studentFeeRefundSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentFeeRefundSlice = createSlice({
  name: 'studentFeeRefunds',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentFeeRefunds: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentFeeRefunds, setLoading } = studentFeeRefundSlice.actions;
export default studentFeeRefundSlice.reducer;

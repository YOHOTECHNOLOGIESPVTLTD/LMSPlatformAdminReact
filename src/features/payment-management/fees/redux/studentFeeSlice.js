// studentFeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentFeeSlice = createSlice({
  name: 'studentFees',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentFees: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentFees, setLoading } = studentFeeSlice.actions;
export default studentFeeSlice.reducer;

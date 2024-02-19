// nonTeachingStaffSalariesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const nonTeachingStaffSalariesSlice = createSlice({
  name: 'nonTeachingStaffSalaries',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setNonTeachingStaffSalaries: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setNonTeachingStaffSalaries, setLoading } = nonTeachingStaffSalariesSlice.actions;
export default nonTeachingStaffSalariesSlice.reducer;

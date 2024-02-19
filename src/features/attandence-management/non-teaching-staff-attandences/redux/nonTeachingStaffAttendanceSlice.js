// nonTeachingStaffAttendancesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const nonTeachingStaffAttendancesSlice = createSlice({
  name: 'nonTeachingStaffAttendances',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setNonTeachingStaffAttendances: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setNonTeachingStaffAttendances, setLoading } = nonTeachingStaffAttendancesSlice.actions;
export default nonTeachingStaffAttendancesSlice.reducer;

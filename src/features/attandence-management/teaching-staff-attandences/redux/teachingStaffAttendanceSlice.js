// teachingStaffAttendancesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const teachingStaffAttendancesSlice = createSlice({
  name: 'teachingStaffAttendances',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setTeachingStaffAttendances: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setTeachingStaffAttendances, setLoading } = teachingStaffAttendancesSlice.actions;
export default teachingStaffAttendancesSlice.reducer;

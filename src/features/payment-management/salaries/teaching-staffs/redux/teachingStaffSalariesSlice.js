// teachingStaffSalariesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const teachingStaffSalariesSlice = createSlice({
  name: 'teachingStaffSalaries',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setTeachingStaffSalaries: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setTeachingStaffSalaries, setLoading } = teachingStaffSalariesSlice.actions;
export default teachingStaffSalariesSlice.reducer;

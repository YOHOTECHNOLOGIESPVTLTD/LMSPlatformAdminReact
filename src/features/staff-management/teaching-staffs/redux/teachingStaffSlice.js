// teachingStaffSlice.js
import { createSlice } from '@reduxjs/toolkit';

const teachingStaffSlice = createSlice({
  name: 'teachingStaffs',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setTeachingStaffs: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setTeachingStaffs, setLoading } = teachingStaffSlice.actions;
export default teachingStaffSlice.reducer;

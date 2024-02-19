// nonTeachingStaffSlice.js
import { createSlice } from '@reduxjs/toolkit';

const nonTeachingStaffSlice = createSlice({
  name: 'nonTeachingStaffs',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setNonTeachingStaffs: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setNonTeachingStaffs, setLoading } = nonTeachingStaffSlice.actions;
export default nonTeachingStaffSlice.reducer;

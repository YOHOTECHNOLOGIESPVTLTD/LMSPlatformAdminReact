// staffIdCardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const staffIdCardSlice = createSlice({
  name: 'staffIdCards',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStaffIdCards: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStaffIdCards, setLoading } = staffIdCardSlice.actions;
export default staffIdCardSlice.reducer;

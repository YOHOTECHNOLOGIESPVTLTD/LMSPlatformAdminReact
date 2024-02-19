// offlineClassSlice.js
import { createSlice } from '@reduxjs/toolkit';

const offlineClassSlice = createSlice({
  name: 'offlineClasses',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setOfflineClasses: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setOfflineClasses, setLoading } = offlineClassSlice.actions;
export default offlineClassSlice.reducer;

// staffNotificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const staffNotificationSlice = createSlice({
  name: 'staffNotifications',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStaffNotifications: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStaffNotifications, setLoading } = staffNotificationSlice.actions;
export default staffNotificationSlice.reducer;

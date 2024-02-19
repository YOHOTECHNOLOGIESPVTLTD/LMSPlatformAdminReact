// allNotificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const allNotificationSlice = createSlice({
  name: 'allNotifications',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setAllNotifications: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setAllNotifications, setLoading } = allNotificationSlice.actions;
export default allNotificationSlice.reducer;

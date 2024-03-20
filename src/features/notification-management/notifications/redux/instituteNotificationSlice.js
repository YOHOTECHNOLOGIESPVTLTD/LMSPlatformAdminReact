// instituteNotificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const instituteNotificationSlice = createSlice({
  name: 'instituteNotifications',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setInstituteNotifications: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setInstituteNotifications, setLoading } = instituteNotificationSlice.actions;
export default instituteNotificationSlice.reducer;

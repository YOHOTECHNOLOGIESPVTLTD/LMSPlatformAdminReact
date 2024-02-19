// studentNotificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentNotificationSlice = createSlice({
  name: 'studentNotifications',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentNotifications: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentNotifications, setLoading } = studentNotificationSlice.actions;
export default studentNotificationSlice.reducer;

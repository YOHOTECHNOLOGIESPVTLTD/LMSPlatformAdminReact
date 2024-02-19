// studentAttendancesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentAttendancesSlice = createSlice({
  name: 'studentAttendances',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentAttendances: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentAttendances, setLoading } = studentAttendancesSlice.actions;
export default studentAttendancesSlice.reducer;

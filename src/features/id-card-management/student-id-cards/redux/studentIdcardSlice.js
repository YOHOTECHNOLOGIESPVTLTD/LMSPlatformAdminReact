// studentIdCardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentIdCardSlice = createSlice({
  name: 'studentIdCards',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentIdCards: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentIdCards, setLoading } = studentIdCardSlice.actions;
export default studentIdCardSlice.reducer;

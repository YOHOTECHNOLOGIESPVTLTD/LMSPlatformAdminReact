// instituteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const instituteSlice = createSlice({
  name: 'institutes',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setInstitutes: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setInstitutes, setLoading } = instituteSlice.actions;
export default instituteSlice.reducer;

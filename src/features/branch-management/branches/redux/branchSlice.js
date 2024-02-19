// branchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setBranches: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setBranches, setLoading } = branchSlice.actions;
export default branchSlice.reducer;

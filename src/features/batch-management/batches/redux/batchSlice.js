// batchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const batchSlice = createSlice({
  name: 'batches',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setBatches: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setBatches, setLoading } = batchSlice.actions;
export default batchSlice.reducer;

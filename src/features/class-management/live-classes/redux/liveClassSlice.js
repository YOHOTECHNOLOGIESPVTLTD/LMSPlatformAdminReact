// liveClassSlice.js
import { createSlice } from '@reduxjs/toolkit';

const liveClassSlice = createSlice({
  name: 'liveClasses',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setLiveClasses: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setLiveClasses, setLoading } = liveClassSlice.actions;
export default liveClassSlice.reducer;

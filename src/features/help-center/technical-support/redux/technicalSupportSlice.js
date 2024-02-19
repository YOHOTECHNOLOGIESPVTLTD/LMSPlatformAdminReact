// technicalSupportSlice.js
import { createSlice } from '@reduxjs/toolkit';

const technicalSupportSlice = createSlice({
  name: 'technicalSupports',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setTechnicalSupports: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setTechnicalSupports, setLoading } = technicalSupportSlice.actions;
export default technicalSupportSlice.reducer;

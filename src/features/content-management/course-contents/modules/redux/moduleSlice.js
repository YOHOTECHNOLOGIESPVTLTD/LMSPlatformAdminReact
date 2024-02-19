// courseModuleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseModuleSlice = createSlice({
  name: 'courseModules',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCourseModules: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCourseModules, setLoading } = courseModuleSlice.actions;
export default courseModuleSlice.reducer;

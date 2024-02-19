// courseCategorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCourses, setLoading } = courseSlice.actions;
export default courseSlice.reducer;

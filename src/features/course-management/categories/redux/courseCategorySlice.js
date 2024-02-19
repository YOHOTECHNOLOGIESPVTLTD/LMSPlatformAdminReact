// courseCategorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseCategorySlice = createSlice({
  name: 'courseCategories',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCourseCategories: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCourseCategories, setLoading } = courseCategorySlice.actions;
export default courseCategorySlice.reducer;

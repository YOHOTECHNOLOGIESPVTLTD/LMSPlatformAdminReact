// faqCategorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const faqCategorySlice = createSlice({
  name: 'faqCategories',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setFaqCategories: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setFaqCategories, setLoading } = faqCategorySlice.actions;
export default faqCategorySlice.reducer;

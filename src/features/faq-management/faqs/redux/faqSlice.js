// faqSlice.js
import { createSlice } from '@reduxjs/toolkit';

const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setFaqs: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setFaqs, setLoading } = faqSlice.actions;
export default faqSlice.reducer;

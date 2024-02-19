// courseNoteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseNoteSlice = createSlice({
  name: 'courseNotes',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCourseNotes: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCourseNotes, setLoading } = courseNoteSlice.actions;
export default courseNoteSlice.reducer;

// courseStudyMaterialSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseStudyMaterialSlice = createSlice({
  name: 'courseStudyMaterials',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCourseStudyMaterials: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCourseStudyMaterials, setLoading } = courseStudyMaterialSlice.actions;
export default courseStudyMaterialSlice.reducer;

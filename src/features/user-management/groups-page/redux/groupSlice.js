// groupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setGroups: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setGroups, setLoading } = groupSlice.actions;
export default groupSlice.reducer;

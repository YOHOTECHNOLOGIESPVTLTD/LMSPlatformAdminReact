// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setUsers, setLoading } = userSlice.actions;
export default userSlice.reducer;

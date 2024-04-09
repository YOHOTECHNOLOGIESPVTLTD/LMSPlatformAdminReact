// olice.js
import { createSlice } from '@reduxjs/toolkit';

const openTicketSlice = createSlice({
  name: 'openTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setOpenTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setOpenTickets, setLoading } = openTicketSlice.actions;
export default openTicketSlice.reducer;

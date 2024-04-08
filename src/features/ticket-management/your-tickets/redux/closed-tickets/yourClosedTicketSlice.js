// clice.js
import { createSlice } from '@reduxjs/toolkit';

const closedTicketSlice = createSlice({
  name: 'closedTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setClosedTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setClosedTickets, setLoading } = closedTicketSlice.actions;
export default closedTicketSlice.reducer;

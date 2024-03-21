// subscriptionPlanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlans',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setSubscriptionPlans: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setSubscriptionPlans, setLoading } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;

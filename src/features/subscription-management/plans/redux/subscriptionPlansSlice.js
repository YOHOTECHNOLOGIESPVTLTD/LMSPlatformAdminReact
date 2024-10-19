// subscriptionPlanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlans',
  initialState: {
    data: [],
    all : [],
    loading: false
  },
  reducers: {
    setSubscriptionPlans: (state, action) => {
      state.data = action.payload;
    },
    setAllPlans : (state,action) => {
      state.all = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setSubscriptionPlans, setLoading, setAllPlans } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;

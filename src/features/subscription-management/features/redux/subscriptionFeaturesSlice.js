// subscriptionFeatureSlice.js
import { createSlice } from '@reduxjs/toolkit';

const subscriptionFeatureSlice = createSlice({
  name: 'subscriptionFeatures',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setSubscriptionFeatures: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setSubscriptionFeatures, setLoading } = subscriptionFeatureSlice.actions;
export default subscriptionFeatureSlice.reducer;

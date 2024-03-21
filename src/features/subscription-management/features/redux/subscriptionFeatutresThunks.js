// SubscriptionFeatureThunks.js
import { getAllSubscriptionFeatures as fetchAllSubscriptionFeatures } from '../services/subscriptionFeaturesServices'; // Replace with your service file
import { setSubscriptionFeatures, setLoading } from './subscriptionFeaturesSlice';

export const getAllSubscriptionFeatures = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllSubscriptionFeatures(data); // Implement this function in your services
    dispatch(setSubscriptionFeatures(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

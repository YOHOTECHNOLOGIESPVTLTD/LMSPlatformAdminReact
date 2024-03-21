// SubscriptionPlanThunks.js
import { getAllSubscriptionPlans as fetchAllSubscriptionPlans } from '../services/subscriptionPlansServices'; // Replace with your service file
import { setSubscriptionPlans, setLoading } from './subscriptionPlansSlice';

export const getAllSubscriptionPlans = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllSubscriptionPlans(data); // Implement this function in your services
    dispatch(setSubscriptionPlans(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

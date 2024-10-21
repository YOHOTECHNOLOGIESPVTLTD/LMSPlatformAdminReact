// SubscriptionPlanThunks.js
import { getAllSubscriptionPlans as fetchAllSubscriptionPlans, getSubscriptionsPlansallList } from '../services/subscriptionPlansServices'; // Replace with your service file
import { setSubscriptionPlans,setAllPlans,setLoading} from './subscriptionPlansSlice';

export const getAllSubscriptionPlans = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllSubscriptionPlans(data)
    dispatch(setSubscriptionPlans(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getSubscriptionList = (data) => async (dispatch) => {
  try {
    // dispatch(setLoading(true));
    const response = await getSubscriptionsPlansallList(data); // Implement this function in your services
    dispatch(setAllPlans(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    // dispatch(setLoading(false));
  }
}

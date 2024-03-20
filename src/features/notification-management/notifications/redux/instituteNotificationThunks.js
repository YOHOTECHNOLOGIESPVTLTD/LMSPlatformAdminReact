// groupThunks.js
import { getAllInstituteNotifications as fetchAllInstituteNotifications } from '../services/instituteNotificationServices'; // Replace with your service file
import { setInstituteNotifications, setLoading } from './instituteNotificationSlice';

export const getAllInstituteNotifications = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllInstituteNotifications(data); // Implement this function in your services
    dispatch(setInstituteNotifications(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

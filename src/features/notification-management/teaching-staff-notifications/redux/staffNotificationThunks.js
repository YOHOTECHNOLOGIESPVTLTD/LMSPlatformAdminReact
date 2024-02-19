// groupThunks.js
import { getAllStaffNotifications as fetchAllStaffNotifications } from '../services/staffNotificationServices'; // Replace with your service file
import { setStaffNotifications, setLoading } from './staffNotificationSlice';

export const getAllStaffNotifications = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffNotifications(selectedBranchId); // Implement this function in your services
    dispatch(setStaffNotifications(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

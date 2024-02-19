// groupThunks.js
import { getAllOfflineClasses as fetchAllOfflineClasses } from '../services/offlineClassServices'; // Replace with your service file
import { setOfflineClasses, setLoading } from './offlineClassSlice';

export const getAllOfflineClasses = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllOfflineClasses(selectedBranchId); // Implement this function in your services
    dispatch(setOfflineClasses(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

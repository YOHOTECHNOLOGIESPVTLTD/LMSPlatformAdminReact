// liveClassesThunks.js
import { getAllLiveClasses as fetchAllLiveClasses } from '../services/liveClassServices'; // Replace with your service file
import { setLiveClasses, setLoading } from './liveClassSlice';

export const getAllLiveClasses = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllLiveClasses(selectedBranchId); // Implement this function in your services
    dispatch(setLiveClasses(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

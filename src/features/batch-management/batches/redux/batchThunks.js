// groupThunks.js
import { getAllBatches as fetchAllBatches } from '../services/batchService'; // Replace with your service file
import { setBatches, setLoading } from './batchSlice';

export const getAllBatches = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllBatches(selectedBranchId); // Implement this function in your services
    dispatch(setBatches(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

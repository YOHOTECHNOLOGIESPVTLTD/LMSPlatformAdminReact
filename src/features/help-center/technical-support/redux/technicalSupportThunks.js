// groupThunks.js
import { getAllTechnicalSupports as fetchAllTechnicalSupports } from '../services/technicalSupportServices'; // Replace with your service file
import { setTechnicalSupports, setLoading } from './technicalSupportSlice';

export const getAllTechnicalSupports = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllTechnicalSupports(); // Implement this function in your services
    dispatch(setTechnicalSupports(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

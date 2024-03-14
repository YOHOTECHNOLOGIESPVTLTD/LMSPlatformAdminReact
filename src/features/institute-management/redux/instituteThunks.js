// InstituteThunks.js
import { getAllInstitutes as fetchAllInstitutes } from '../services/instituteService'; // Replace with your service file
import { setInstitutes, setLoading } from './instituteSlice';

export const getAllInstitutes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllInstitutes(); // Implement this function in your services
    dispatch(setInstitutes(response?.data.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

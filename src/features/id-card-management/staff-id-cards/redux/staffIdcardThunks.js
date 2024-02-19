// groupThunks.js
import { getAllStaffIdCards as fetchAllStaffIdCards } from '../services/staffIdcardServices'; // Replace with your service file
import { setStaffIdCards, setLoading } from './staffIdcardSlice';

export const getAllStaffIdCards = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffIdCards(); // Implement this function in your services
    dispatch(setStaffIdCards(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

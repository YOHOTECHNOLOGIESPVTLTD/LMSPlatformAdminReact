// groupThunks.js
import { getAllStudentIdCards as fetchAllStudentIdCards } from '../services/studentIdcardServices'; // Replace with your service file
import { setStudentIdCards, setLoading } from './studentIdcardSlice';

export const getAllStudentIdCards = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentIdCards(); // Implement this function in your services
    dispatch(setStudentIdCards(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

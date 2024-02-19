// StudentThunks.js
import { getAllStudents as fetchAllStudents } from '../services/studentService'; // Replace with your service file
import { setStudents, setLoading } from './studentSlice';

export const getAllStudents = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudents(selectedBranchId); // Implement this function in your services
    dispatch(setStudents(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

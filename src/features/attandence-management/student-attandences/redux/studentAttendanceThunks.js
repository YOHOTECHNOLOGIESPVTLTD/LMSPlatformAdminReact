// groupThunks.js
import { getAllStudentAttendances as fetchAllStudentAttendances } from '../services/studentAttendanceServices'; // Replace with your service file
import { setStudentAttendances, setLoading } from './studentAttendanceSlice';

export const getAllStudentAttendances = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentAttendances(selectedBranchId); // Implement this function in your services
    dispatch(setStudentAttendances(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

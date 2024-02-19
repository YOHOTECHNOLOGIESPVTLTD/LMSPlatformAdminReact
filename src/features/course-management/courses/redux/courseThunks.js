// coursesThunks.js
import { getAllCourses as fetchAllCourses } from '../services/courseServices'; // Replace with your service file
import { setCourses, setLoading } from './courseSlice';

export const getAllCourses = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourses(selectedBranchId); // Implement this function in your services
    dispatch(setCourses(response?.data.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

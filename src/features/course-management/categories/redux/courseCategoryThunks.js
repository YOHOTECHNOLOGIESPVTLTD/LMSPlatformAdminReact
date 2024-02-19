// courseCategoryThunks.js
import { getAllCourseCategories as fetchAllCourseCategories } from '../services/courseCategoryServices'; // Replace with your service file
import { setCourseCategories, setLoading } from './courseCategorySlice';

export const getAllCourseCategories = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourseCategories(selectedBranchId); // Implement this function in your services
    dispatch(setCourseCategories(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

// groupThunks.js
import { getAllNonTeachingStaffSalaries as fetchAllNonTeachingStaffSalaries } from '../services/nonTeachingStaffSalariesServices'; // Replace with your service file
import { setNonTeachingStaffSalaries, setLoading } from './nonTeachingStaffSalariesSlice';

export const getAllNonTeachingStaffSalaries = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllNonTeachingStaffSalaries(selectedBranchId); // Implement this function in your services
    dispatch(setNonTeachingStaffSalaries(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

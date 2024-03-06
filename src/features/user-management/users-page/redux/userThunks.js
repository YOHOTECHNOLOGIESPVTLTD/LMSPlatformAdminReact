// groupThunks.js
import { getAllUsers as fetchAllUsers } from '../services/userServices'; // Replace with your service file
import { setUsers, setLoading } from './userSlices';

export const getAllUsers = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllUsers(selectedBranchId); // Implement this function in your services
    dispatch(setUsers(response?.data?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

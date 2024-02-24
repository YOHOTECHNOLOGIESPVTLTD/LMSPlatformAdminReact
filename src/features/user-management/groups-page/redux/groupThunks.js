// groupThunks.js
import { getAllGroups as fetchAllGroups } from '../services/groupService'; // Replace with your service file
import { setGroups, setLoading } from './groupSlice';

export const getAllGroups = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllGroups(selectedBranchId); // Implement this function in your services
    dispatch(setGroups(response?.data.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

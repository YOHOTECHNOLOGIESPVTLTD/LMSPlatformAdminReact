// groupThunks.js
import { getAllStudentFeeRefunds as fetchAllStudentFeeRefunds } from '../services/studentFeeRefundServices'; // Replace with your service file
import { setStudentFeeRefunds, setLoading } from './studentFeeRefundSlice';

export const getAllStudentFeeRefunds = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentFeeRefunds(selectedBranchId); // Implement this function in your services
    dispatch(setStudentFeeRefunds(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

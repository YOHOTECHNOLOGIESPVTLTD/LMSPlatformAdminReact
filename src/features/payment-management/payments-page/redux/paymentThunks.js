// paymentThunks.js
import { getAllPayments as fetchAllPayments } from '../services/paymentServices'; // Replace with your service file
import { setPayments, setLoading } from './paymentSlice';

export const getAllPayments = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllPayments(selectedBranchId); // Implement this function in your services
    dispatch(setPayments(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

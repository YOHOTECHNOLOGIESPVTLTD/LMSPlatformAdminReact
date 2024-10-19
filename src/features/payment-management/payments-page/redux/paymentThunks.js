// paymentThunks.js
import { getAllPayments as fetchAllPayments } from '../services/paymentServices';
import { setPayments, setLoading } from './paymentSlice';

export const getAllPayments = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllPayments(selectedBranchId);
    console.log(response,"payment thunks response")
    dispatch(setPayments(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

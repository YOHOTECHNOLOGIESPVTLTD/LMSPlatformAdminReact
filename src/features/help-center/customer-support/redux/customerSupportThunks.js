// groupThunks.js
import { getAllCustomerSupports as fetchAllCustomerSupports } from '../services/customerSupportServices'; // Replace with your service file
import { setCustomerSupports, setLoading } from './customerSupportSlice';

export const getAllCustomerSupports = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCustomerSupports(); // Implement this function in your services
    dispatch(setCustomerSupports(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

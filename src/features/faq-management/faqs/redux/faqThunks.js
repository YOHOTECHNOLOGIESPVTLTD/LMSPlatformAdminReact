// FaqCategoryThunks.js
import { getAllFaqs as fetchAllFaqs } from '../services/faqServices'; // Replace with your service file
import { setFaqs, setLoading } from './faqSlice';

export const getAllFaqs = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllFaqs(data); // Implement this function in your services
    dispatch(setFaqs(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

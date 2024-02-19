// groupThunks.js
import { getAllStudentCertificates as fetchAllStudentCertificates } from '../services/studentCertificateServices'; // Replace with your service file
import { setStudentCertificates, setLoading } from './studentCertificateSlice';

export const getAllStudentCertificates = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentCertificates(); // Implement this function in your services
    dispatch(setStudentCertificates(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

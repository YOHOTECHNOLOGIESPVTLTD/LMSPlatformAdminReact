// InstituteThunks.js
import { getAllInstitutes as fetchAllInstitutes } from '../services/instituteService'; // Replace with your service file
import { setInstitutes, setLoading } from './instituteSlice';

export const getAllInstitutes = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllInstitutes(data); 
    console.log(response,"response")
    dispatch(setInstitutes(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

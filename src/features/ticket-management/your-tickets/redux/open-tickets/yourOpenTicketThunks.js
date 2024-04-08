// Thunks.js
import { getAllTickets as fetchAllStaffOpenTickets } from '../../services/ticketService'; // Replace with your service file
import { setOpenTickets, setLoading } from './yourOpenTicketSlice';

export const getAllOpenTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffOpenTickets(data); // Implement this function in your services
    dispatch(setOpenTickets(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunks.js
import { getAllTickets as fetchAllOpenTickets } from '../../services/ticketService'; // Replace with your service file
import { setClosedTickets, setLoading } from './yourClosedTicketSlice';

export const getAllClosedTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllOpenTickets(data); // Implement this function in your services
    dispatch(setClosedTickets(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

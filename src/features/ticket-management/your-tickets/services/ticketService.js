// groupService.js
import axios from 'axios';

const TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/-ticket`;
const _TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/-ticket`;

export const getAllTickets = async (data) => {
  try {
    const response = await axios.get(`${TICKET_END_POINT}/get-by-type`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log('getAllTickets:', response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Tickets. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTickets:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const updateTicket = async (data) => {
  try {
    const response = await axios.put(`${_TICKET_UPDATE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Ticket updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Ticket' };
    }
  } catch (error) {
    console.error('Error in updateTicket:', error);
    throw error;
  }
};

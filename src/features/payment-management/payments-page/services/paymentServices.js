// PaymentService.js
import axios from 'axios';

const PAYMENT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}api/platform/admin/subscription-management/institute-subscriptions`;

const Subscription_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/subscription-management/subscription-plans`;

export const getAllPayments = async () => {
  try {
    const response = await axios.get(`${PAYMENT_API_ENDPOINT}/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Payments. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllPayments:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchPayments = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchPayments:', error);
    throw error;
  }
};

export const addPayment = async (data) => {
  try {
    const response = await axios.post(`${PAYMENT_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Payment created successfully' };
    } else {
      return { success: false, message: 'Failed to create Payment' };
    }
  } catch (error) {
    console.error('Error in addPayment:', error);
    throw error;
  }
};

export const deletePayment = async (PaymentId) => {
  try {
    const response = await axios.delete(`${PAYMENT_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: PaymentId }
    });

    if (response.data.status) {
      return { success: true, message: 'Payment deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Payment' };
    }
  } catch (error) {
    console.error('Error in deletePayment:', error);
    throw error;
  }
};

export const updatePayment = async (data) => {
  try {
    const response = await axios.put(`${PAYMENT_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Payment updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Payment' };
    }
  } catch (error) {
    console.error('Error in updatePayment:', error);
    throw error;
  }
};

export const getAllPaymentSubscription = async () => {
  try {
    const response = await axios.get(`${Subscription_API_ENDPOINT}/show`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Payments. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllPayments:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
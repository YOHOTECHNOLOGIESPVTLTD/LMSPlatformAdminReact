import axios from 'axios';

const SUBSCRIPTION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/paltfrom/admin/subscription-management`;

export const getAllSubsciptions = async () => {
  try {
    const response = await axios.get(`${SUBSCRIPTION_API_ENDPOINT}/institute-subscriptions/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('getAllSubscriptions',response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch subscriptions. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in subscriptions:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

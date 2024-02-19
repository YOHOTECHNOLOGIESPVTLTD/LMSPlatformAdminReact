// CustomerSupportService.js
import axios from 'axios';

const CUSTOMER_SUPPORT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/CustomerSupport-management/CustomerSupport`;

export const getAllCustomerSupports = async () => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Check if the response status is successful
    if (response.status === 200) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch CustomerSupports. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCustomerSupports:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchCustomerSupports = async (searchQuery) => {
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
    console.error('Error in searchCustomerSupports:', error);
    throw error;
  }
};

export const addCustomerSupport = async (data) => {
  try {
    const response = await axios.post(`${CUSTOMER_SUPPORT_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'CustomerSupport created successfully' };
    } else {
      return { success: false, message: 'Failed to create CustomerSupport' };
    }
  } catch (error) {
    console.error('Error in addCustomerSupport:', error);
    throw error;
  }
};

export const deleteCustomerSupport = async (CustomerSupportId) => {
  try {
    const response = await axios.delete(`${CUSTOMER_SUPPORT_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: CustomerSupportId }
    });

    if (response.data.status) {
      return { success: true, message: 'CustomerSupport deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete CustomerSupport' };
    }
  } catch (error) {
    console.error('Error in deleteCustomerSupport:', error);
    throw error;
  }
};

export const updateCustomerSupport = async (data) => {
  try {
    const response = await axios.put(`${CUSTOMER_SUPPORT_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CustomerSupport updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CustomerSupport' };
    }
  } catch (error) {
    console.error('Error in updateCustomerSupport:', error);
    throw error;
  }
};

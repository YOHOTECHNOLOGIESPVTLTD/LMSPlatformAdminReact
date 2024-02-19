// TechnicalSupportService.js
import axios from 'axios';

const TECHNICAL_SUPPORT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/TechnicalSupport-management/TechnicalSupport`;

export const getAllTechnicalSupports = async () => {
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
      throw new Error(`Failed to fetch TechnicalSupports. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTechnicalSupports:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchTechnicalSupports = async (searchQuery) => {
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
    console.error('Error in searchTechnicalSupports:', error);
    throw error;
  }
};

export const addTechnicalSupport = async (data) => {
  try {
    const response = await axios.post(`${TECHNICAL_SUPPORT_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'TechnicalSupport created successfully' };
    } else {
      return { success: false, message: 'Failed to create TechnicalSupport' };
    }
  } catch (error) {
    console.error('Error in addTechnicalSupport:', error);
    throw error;
  }
};

export const deleteTechnicalSupport = async (TechnicalSupportId) => {
  try {
    const response = await axios.delete(`${TECHNICAL_SUPPORT_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: TechnicalSupportId }
    });

    if (response.data.status) {
      return { success: true, message: 'TechnicalSupport deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete TechnicalSupport' };
    }
  } catch (error) {
    console.error('Error in deleteTechnicalSupport:', error);
    throw error;
  }
};

export const updateTechnicalSupport = async (data) => {
  try {
    const response = await axios.put(`${TECHNICAL_SUPPORT_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'TechnicalSupport updated successfully' };
    } else {
      return { success: false, message: 'Failed to update TechnicalSupport' };
    }
  } catch (error) {
    console.error('Error in updateTechnicalSupport:', error);
    throw error;
  }
};

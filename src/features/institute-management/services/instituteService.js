// InstituteService.js
import axios from 'axios';

const INSTITUTE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/Institute`;

const SEARCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/Institute/search`;

export const getAllInstitutes = async () => {
  try {
    const response = await axios.get(`${INSTITUTE_API_END_POINT}/read-by-branch-id`, {
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
      throw new Error(`Failed to fetch Institutes. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllInstitutes:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchInstitutes = async (searchQuery) => {
  try {
    const response = await axios.get(SEARCH_API_ENDPOINT, {
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
    console.error('Error in searchInstitutes:', error);
    throw error;
  }
};

export const addInstitute = async (data) => {
  try {
    const response = await axios.post(`${INSTITUTE_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Institute created successfully' };
    } else {
      return { success: false, message: 'Failed to create Institute' };
    }
  } catch (error) {
    console.error('Error in addInstitute:', error);
    throw error;
  }
};

export const deleteInstitute = async (InstituteId) => {
  try {
    const response = await axios.delete(`${INSTITUTE_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: InstituteId }
    });

    if (response.data.status) {
      return { success: true, message: 'Institute deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Institute' };
    }
  } catch (error) {
    console.error('Error in deleteInstitute:', error);
    throw error;
  }
};

export const updateInstitute = async (data) => {
  try {
    const response = await axios.put(`${INSTITUTE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Institute updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Institute' };
    }
  } catch (error) {
    console.error('Error in updateInstitute:', error);
    throw error;
  }
};

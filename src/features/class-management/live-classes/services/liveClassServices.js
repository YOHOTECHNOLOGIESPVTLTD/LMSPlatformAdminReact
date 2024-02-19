// liveClassService.js
import axios from 'axios';

const LIVE_CLASS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/class-management/class`;

export const getAllLiveClasses = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${LIVE_CLASS_API_END_POINT}/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { branch_id: selectedBranchId }
    });

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch LiveClasses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllLiveClasses:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchLiveClasses = async (searchQuery) => {
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
    console.error('Error in searchLiveClasses:', error);
    throw error;
  }
};

export const addLiveClass = async (data) => {
  try {
    const response = await axios.post(`${LIVE_CLASS_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'LiveClass created successfully' };
    } else {
      return { success: false, message: 'Failed to create LiveClass' };
    }
  } catch (error) {
    console.error('Error in addLiveClass:', error);
    throw error;
  }
};

export const deleteLiveClass = async (LiveClassId) => {
  try {
    const response = await axios.delete(`${LIVE_CLASS_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: LiveClassId }
    });

    if (response.data.status) {
      return { success: true, message: 'LiveClass deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete LiveClass' };
    }
  } catch (error) {
    console.error('Error in deleteLiveClass:', error);
    throw error;
  }
};

export const updateLiveClass = async (data) => {
  try {
    const response = await axios.put(`${LIVE_CLASS_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'LiveClass updated successfully' };
    } else {
      return { success: false, message: 'Failed to update LiveClass' };
    }
  } catch (error) {
    console.error('Error in updateLiveClass:', error);
    throw error;
  }
};

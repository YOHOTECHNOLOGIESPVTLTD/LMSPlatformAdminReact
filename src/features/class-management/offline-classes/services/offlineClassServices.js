// groupService.js
import axios from 'axios';

const OFFLINE_CLASS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/class-management/class`;

export const getAllOfflineClasses = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${OFFLINE_CLASS_API_END_POINT}/get-all`, {
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
      throw new Error(`Failed to fetch OfflineClasses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllOfflineClasses:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchOfflineClasses = async (searchQuery) => {
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
    console.error('Error in searchOfflineClasses:', error);
    throw error;
  }
};

export const addOfflineClass = async (data) => {
  try {
    const response = await axios.post(`${OFFLINE_CLASS_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'OfflineClass created successfully' };
    } else {
      return { success: false, message: 'Failed to create OfflineClass' };
    }
  } catch (error) {
    console.error('Error in addOfflineClass:', error);
    throw error;
  }
};

export const deleteOfflineClass = async (OfflineClassId) => {
  try {
    const response = await axios.delete(`${OFFLINE_CLASS_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: OfflineClassId }
    });

    if (response.data.status) {
      return { success: true, message: 'OfflineClass deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete OfflineClass' };
    }
  } catch (error) {
    console.error('Error in deleteOfflineClass:', error);
    throw error;
  }
};

export const updateOfflineClass = async (data) => {
  try {
    const response = await axios.put(`${OFFLINE_CLASS_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'OfflineClass updated successfully' };
    } else {
      return { success: false, message: 'Failed to update OfflineClass' };
    }
  } catch (error) {
    console.error('Error in updateOfflineClass:', error);
    throw error;
  }
};

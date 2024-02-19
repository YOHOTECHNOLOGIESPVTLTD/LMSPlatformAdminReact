// userService.js
import axios from 'axios';

const USER_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/user`;

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${USER_API_ENDPOINT}/query-by-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: id }
    });

    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchUsers:', error);
    throw error;
  }
};
export const userChangePassword = async (data) => {
  try {
    const response = await axios.put(`${USER_API_ENDPOINT}/password-update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Password changed successfully' };
    } else {
      return { success: false, message: 'Failed to update User' };
    }
  } catch (error) {
    console.error('Error in updateUsers:', error);
    throw error;
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.post('/data_storage/user-management/users/SingleUser.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: data
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to update User' };
    }
  } catch (error) {
    console.error('Error in updateUsers:', error);
    throw error;
  }
};

export const getAllActiveGroups = async () => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Check if the response status is successful
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch Groups' };
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllGroups:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

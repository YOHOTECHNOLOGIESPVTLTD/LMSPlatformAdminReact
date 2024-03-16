// userService.js
import axios from 'axios';

const USER_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/platform-user`;
const USER_API_USER_NAME_CHECK_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/user/check-username`;

export const getAllUsers = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${USER_API_ENDPOINT}/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { branch_id: selectedBranchId }
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const getUserActivityLog = async (data) => {
  try {
    const response = await axios.get(`${USER_API_ENDPOINT}/activity-log-by-user-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch users. Activity Log: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers Activity Log:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const getUserById = async (data) => {
  try {
    const response = await axios.get(`${USER_API_ENDPOINT}/query-by-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await axios.put(`${USER_API_ENDPOINT}/delete`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'User deleted successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};
export const updateUserStatus = async (data) => {
  try {
    const response = await axios.put(`${USER_API_ENDPOINT}/status-update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'User status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};
export const userChangePassword = async (data,id) => {
  try {
    const response = await axios.put(`${USER_API_ENDPOINT}/reset-password`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params:{
        data:data,
        id:id
      }
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'User status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};
export const updateUser = async (data) => {
  try {
    const response = await axios.post(`${USER_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'User created successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};
export const addUser = async (data) => {
  try {
    const response = await axios.post(`${USER_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'User created successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};

export const searchUsers = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/users/AllUsers.json', {
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
    console.error('Error in searchUsers:', error);
    throw error;
  }
};
export const checkUserName = async (userName) => {
  try {
    const response = await axios.post(
      `${USER_API_USER_NAME_CHECK_ENDPOINT}`,
      { username: userName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        // params: { username: userName }
      }
    );
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'UserName valid' };
    } else {
      return { success: false, message: 'UserName Invalid' };
    }
  } catch (error) {
    console.error('Error in searchUsers:', error);
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

export const FilterUsersByRole = async (id) => {
  try {
    const response = await axios.get('/data_storage/user-management/users/AllUsers.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: id }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchUsers:', error);
    throw error;
  }
};
export const FilterUsersByStatus = async (status) => {
  try {
    const response = await axios.get('/data_storage/user-management/users/AllUsers.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { status: status }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchUsers:', error);
    throw error;
  }
};

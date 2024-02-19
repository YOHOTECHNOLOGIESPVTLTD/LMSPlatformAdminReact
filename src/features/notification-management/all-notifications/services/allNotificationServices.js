// Notificationservice.js
import axios from 'axios';

const NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/notification-management/student-notifications`;

export const getAllNotifications = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${NOTIFICATION_API_ENDPOINT}/read-all-notifications`, {
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
      throw new Error(`Failed to fetch StaffNotifications. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffNotifications:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchNotifications = async (searchQuery) => {
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
    console.error('Error in searchNotifications:', error);
    throw error;
  }
};

export const addNotification = async (data) => {
  try {
    const response = await axios.post(`${NOTIFICATION_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Notification created successfully' };
    } else {
      return { success: false, message: 'Failed to create Notification' };
    }
  } catch (error) {
    console.error('Error in addNotification:', error);
    throw error;
  }
};

export const deleteNotification = async (NotificationId) => {
  try {
    const response = await axios.delete(`${NOTIFICATION_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: NotificationId }
    });

    if (response.data.status) {
      return { success: true, message: 'Notification deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Notification' };
    }
  } catch (error) {
    console.error('Error in deleteNotification:', error);
    throw error;
  }
};

export const updateNotification = async (data) => {
  try {
    const response = await axios.put(`${NOTIFICATION_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Notification updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Notification' };
    }
  } catch (error) {
    console.error('Error in updateNotification:', error);
    throw error;
  }
};

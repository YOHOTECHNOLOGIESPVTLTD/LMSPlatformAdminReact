// studentNotificationservice.js
import axios from 'axios';

const STUDENT_NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/notification-management/student-notifications`;

export const getAllStudentNotifications = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${STUDENT_NOTIFICATION_API_ENDPOINT}/read-all-student-notifications`, {
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
      throw new Error(`Failed to fetch StudentNotifications. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentNotifications:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudentNotifications = async (searchQuery) => {
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
    console.error('Error in searchStudentNotifications:', error);
    throw error;
  }
};

export const addStudentNotification = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_NOTIFICATION_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentNotification created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentNotification' };
    }
  } catch (error) {
    console.error('Error in addStudentNotification:', error);
    throw error;
  }
};

export const deleteStudentNotification = async (StudentNotificationId) => {
  try {
    const response = await axios.delete(`${STUDENT_NOTIFICATION_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentNotificationId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentNotification deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentNotification' };
    }
  } catch (error) {
    console.error('Error in deleteStudentNotification:', error);
    throw error;
  }
};

export const updateStudentNotification = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_NOTIFICATION_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentNotification updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentNotification' };
    }
  } catch (error) {
    console.error('Error in updateStudentNotification:', error);
    throw error;
  }
};

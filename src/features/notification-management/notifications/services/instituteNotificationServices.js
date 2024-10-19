// Notificationservice.js
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';
import Client from "../../../../api/index"

const NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/notification-management/student-notifications`;


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

export const getInstituteBrancheswithId = async (data) => {
   try {
    const response = await Client.branch.get_all(data)
    console.log(response,"response")
    return response
   } catch (error) {
    console.log(error,"error")
     const error_message = getErrorMessage(error)
     throw new Error(error_message)
   }
}

export const createInstituteNotification = async (data) => {
   try {
    const response = await Client.notification.create(data)
    return response
   } catch (error) {
     const error_message = getErrorMessage(error)
     throw new Error(error_message)
   }
}


export const getAllInstituteNotifications = async(data) => {
  try{
   const response = await Client.notification.get_all(data)
   return response
  }catch(error){
    const error_message = getErrorMessage(error)
    throw new Error(error_message) 
  }
}
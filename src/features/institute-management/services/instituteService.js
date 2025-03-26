// InstituteService.js
import axios from 'axios';
import Client from "../../../api/index"
const INSTITUTE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/institute-management/institutes`;

const SEARCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/Institute/search`;
const USER_API_USER_NAME_CHECK_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/platform-user/user-name-check`;
export const getAllInstitutes = async () => {
  try {
    const response = await Client.institute.all()
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

export const InstituteGetById = async (data) => {
  try {
    const response = await Client.institute.getWithId(data)

    console.log(response);

    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: 'Failed to fetch institute' };
    }
  } catch (error) {
    console.error('Error in fetch institute:', error);
    throw error;
  }
};
export const GetInstituteActivityLog = async (data) => {
  try {
    console.log('am working');
    
    const response = await axios.get(`${INSTITUTE_API_END_POINT}/activity-log`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: 'Failed to fetch Institute Activity Log' };
    }
  } catch (error) {
    console.error('Error in fetch Institute Activity Log:', error);
    throw error;
  }
};

export const addInstitute = async (data) => {
  try {
    const response = await Client.institute.create(data)
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

export const instituteChangeStatus = async (data) => {
  try {
    const response = await axios.post(`${INSTITUTE_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Institute status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Institute status' };
    }
  } catch (error) {
    console.error('Error in updateInstitute status:', error);
    throw error;
  }
};
export const updateInstitute = async (data) => {
  try {
    const response = await axios.post(`${INSTITUTE_API_END_POINT}/update`, data, {
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
    console.error('Error in CheckUserName:', error);
    throw error;
  }
};

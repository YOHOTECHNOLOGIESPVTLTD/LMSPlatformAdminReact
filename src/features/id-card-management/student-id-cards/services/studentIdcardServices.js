// studentIdCardService.js
import axios from 'axios';

const STUDENT_ID_CARDS_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/StudentIdCard-management/StudentIdCard`;

export const getAllStudentIdCards = async () => {
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
      throw new Error(`Failed to fetch StudentIdCards. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentIdCards:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudentIdCards = async (searchQuery) => {
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
    console.error('Error in searchStudentIdCards:', error);
    throw error;
  }
};

export const addStudentIdCard = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_ID_CARDS_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentIdCard created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentIdCard' };
    }
  } catch (error) {
    console.error('Error in addStudentIdCard:', error);
    throw error;
  }
};

export const deleteStudentIdCard = async (StudentIdCardId) => {
  try {
    const response = await axios.delete(`${STUDENT_ID_CARDS_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentIdCardId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentIdCard deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentIdCard' };
    }
  } catch (error) {
    console.error('Error in deleteStudentIdCard:', error);
    throw error;
  }
};

export const updateStudentIdCard = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_ID_CARDS_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentIdCard updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentIdCard' };
    }
  } catch (error) {
    console.error('Error in updateStudentIdCard:', error);
    throw error;
  }
};

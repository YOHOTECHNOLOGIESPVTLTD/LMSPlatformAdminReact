// groupService.js
import axios from 'axios';

const STUDENT_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/student-management/students`;

export const getAllStudents = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${STUDENT_API_END_POINT}/read`, {
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
      throw new Error(`Failed to fetch Students. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudents:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudents = async (searchQuery) => {
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
    console.error('Error in searchStudents:', error);
    throw error;
  }
};

export const addStudent = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Student created successfully' };
    } else {
      return { success: false, message: 'Failed to create Student' };
    }
  } catch (error) {
    console.error('Error in addStudent:', error);
    throw error;
  }
};

export const deleteStudent = async (StudentId) => {
  try {
    const response = await axios.delete(`${STUDENT_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentId }
    });

    if (response.data.status) {
      return { success: true, message: 'Student deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Student' };
    }
  } catch (error) {
    console.error('Error in deleteStudent:', error);
    throw error;
  }
};

export const updateStudent = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Student updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Student' };
    }
  } catch (error) {
    console.error('Error in updateStudent:', error);
    throw error;
  }
};

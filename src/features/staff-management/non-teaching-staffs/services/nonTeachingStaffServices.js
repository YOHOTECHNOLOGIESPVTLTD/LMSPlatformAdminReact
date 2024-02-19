// NonTeachingStaffservice.js
import axios from 'axios';

const NON_TEACHING_STAFF_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/TeachingStaff-management/TeachingStaff`;

export const getAllNonTeachingStaffs = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${NON_TEACHING_STAFF_API_END_POINT}/read`, {
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
      throw new Error(`Failed to fetch NonTeachingStaffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllNonTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};


export const searchNonTeachingStaffs = async (searchQuery) => {
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
    console.error('Error in searchNonTeachingStaffs:', error);
    throw error;
  }
};

export const addNonTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${NON_TEACHING_STAFF_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaff created successfully' };
    } else {
      return { success: false, message: 'Failed to create NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in addNonTeachingStaff:', error);
    throw error;
  }
};

export const deleteNonTeachingStaff = async (nonTeachingStaffId) => {
  try {
    const response = await axios.delete(`${NON_TEACHING_STAFF_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: nonTeachingStaffId }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaff deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in deleteNonTeachingStaff:', error);
    throw error;
  }
};

export const updateNonTeachingStaff = async (data) => {
  try {
    const response = await axios.put(`${NON_TEACHING_STAFF_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'NonTeachingStaff updated successfully' };
    } else {
      return { success: false, message: 'Failed to update NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in updateNonTeachingStaff:', error);
    throw error;
  }
};

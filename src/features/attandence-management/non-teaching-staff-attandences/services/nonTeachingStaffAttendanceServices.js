// groupService.js
import axios from 'axios';

const NON_TEACHING_STAFF_ATTENDANCES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/attendance-management/non-teaching-staff`;

export const getAllNonTeachingStaffAttendances = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${NON_TEACHING_STAFF_ATTENDANCES_API_END_POINT}/get-all`, {
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
      throw new Error(`Failed to fetch TeachingStaffAttendances. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffAttendances:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchNonTeachingStaffAttendances = async (searchQuery) => {
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
    console.error('Error in searchNonTeachingStaffAttendances:', error);
    throw error;
  }
};

export const addNonTeachingStaffAttendance = async (data) => {
  try {
    const response = await axios.post(`${NON_TEACHING_STAFF_ATTENDANCES_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaffAttendance created successfully' };
    } else {
      return { success: false, message: 'Failed to create NonTeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in addNonTeachingStaffAttendance:', error);
    throw error;
  }
};

export const deleteNonTeachingStaffAttendance = async (NonTeachingStaffAttendanceId) => {
  try {
    const response = await axios.delete(`${NON_TEACHING_STAFF_ATTENDANCES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: NonTeachingStaffAttendanceId }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaffAttendance deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete NonTeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in deleteNonTeachingStaffAttendance:', error);
    throw error;
  }
};

export const updateNonTeachingStaffAttendance = async (data) => {
  try {
    const response = await axios.put(`${NON_TEACHING_STAFF_ATTENDANCES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'NonTeachingStaffAttendance updated successfully' };
    } else {
      return { success: false, message: 'Failed to update NonTeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in updateNonTeachingStaffAttendance:', error);
    throw error;
  }
};

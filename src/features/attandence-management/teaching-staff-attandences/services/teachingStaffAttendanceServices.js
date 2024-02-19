// groupService.js
import axios from 'axios';

const TEACHING_STAFF_ATTENDANCES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/attendance-management/teaching-staff`;

export const getAllTeachingStaffAttendances = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_ATTENDANCES_API_END_POINT}/get-all`, {
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

export const searchTeachingStaffAttendances = async (searchQuery) => {
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
    console.error('Error in searchTeachingStaffAttendances:', error);
    throw error;
  }
};

export const addTeachingStaffAttendance = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_ATTENDANCES_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'TeachingStaffAttendance created successfully' };
    } else {
      return { success: false, message: 'Failed to create TeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in addTeachingStaffAttendance:', error);
    throw error;
  }
};

export const deleteTeachingStaffAttendance = async (TeachingStaffAttendanceId) => {
  try {
    const response = await axios.delete(`${TEACHING_STAFF_ATTENDANCES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: TeachingStaffAttendanceId }
    });

    if (response.data.status) {
      return { success: true, message: 'TeachingStaffAttendance deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete TeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in deleteTeachingStaffAttendance:', error);
    throw error;
  }
};

export const updateTeachingStaffAttendance = async (data) => {
  try {
    const response = await axios.put(`${TEACHING_STAFF_ATTENDANCES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'TeachingStaffAttendance updated successfully' };
    } else {
      return { success: false, message: 'Failed to update TeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in updateTeachingStaffAttendance:', error);
    throw error;
  }
};

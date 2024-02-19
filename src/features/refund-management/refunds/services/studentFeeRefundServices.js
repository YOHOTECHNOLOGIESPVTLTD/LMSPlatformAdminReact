// studentFeeRefundservice.js
import axios from 'axios';

const STUDENT_FEE_REFUND_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/refund-management/student-fee-refunds`;

export const getAllStudentFeeRefunds = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${STUDENT_FEE_REFUND_API_ENDPOINT}/read-by-branch-id`, {
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
      throw new Error(`Failed to fetch StudentFeeRefunds. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentFeeRefunds:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudentFeeRefunds = async (searchQuery) => {
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
    console.error('Error in searchStudentFeeRefunds:', error);
    throw error;
  }
};

export const addStudentFeeRefund = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_FEE_REFUND_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentFeeRefund created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentFeeRefund' };
    }
  } catch (error) {
    console.error('Error in addStudentFeeRefund:', error);
    throw error;
  }
};

export const deleteStudentFeeRefund = async (StudentFeeRefundId) => {
  try {
    const response = await axios.delete(`${STUDENT_FEE_REFUND_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentFeeRefundId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentFeeRefund deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentFeeRefund' };
    }
  } catch (error) {
    console.error('Error in deleteStudentFeeRefund:', error);
    throw error;
  }
};

export const updateStudentFeeRefund = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_FEE_REFUND_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentFeeRefund updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentFeeRefund' };
    }
  } catch (error) {
    console.error('Error in updateStudentFeeRefund:', error);
    throw error;
  }
};

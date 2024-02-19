// studentCertificateService.js
import axios from 'axios';

const STUDENT_CERTIFICATE_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/StudentCertificate-management/StudentCertificate`;

export const getAllStudentCertificates = async () => {
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
      throw new Error(`Failed to fetch StudentCertificates. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentCertificates:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudentCertificates = async (searchQuery) => {
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
    console.error('Error in searchStudentCertificates:', error);
    throw error;
  }
};

export const addStudentCertificate = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_CERTIFICATE_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentCertificate created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in addStudentCertificate:', error);
    throw error;
  }
};

export const deleteStudentCertificate = async (StudentCertificateId) => {
  try {
    const response = await axios.delete(`${STUDENT_CERTIFICATE_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentCertificateId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentCertificate deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in deleteStudentCertificate:', error);
    throw error;
  }
};

export const updateStudentCertificate = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_CERTIFICATE_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentCertificate updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in updateStudentCertificate:', error);
    throw error;
  }
};

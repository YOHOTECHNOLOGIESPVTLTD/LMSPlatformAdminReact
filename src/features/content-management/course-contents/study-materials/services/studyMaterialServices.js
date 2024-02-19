// groupService.js
import axios from 'axios';

const COURSE_STUDY_MATERIALS_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/content-management/course-study-materials`;

export const getAllStudyMaterials = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${COURSE_STUDY_MATERIALS_END_POINT}/read`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { branch_id: selectedBranchId }
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Courses Study Materials. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseStudyMaterials:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchCourseStudyMaterials = async (searchQuery) => {
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
    console.error('Error in searchCourseStudyMaterials:', error);
    throw error;
  }
};

export const addCourseStudyMaterial = async (data) => {
  try {
    const response = await axios.post(`${COURSE_STUDY_MATERIALS_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'CourseStudyMaterial created successfully' };
    } else {
      return { success: false, message: 'Failed to create CourseStudyMaterial' };
    }
  } catch (error) {
    console.error('Error in addCourseStudyMaterial:', error);
    throw error;
  }
};

export const deleteCourseStudyMaterial = async (courseStudyMaterialId) => {
  try {
    const response = await axios.delete(`${COURSE_STUDY_MATERIALS_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: courseStudyMaterialId }
    });

    if (response.data.status) {
      return { success: true, message: 'CourseStudyMaterial deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete CourseStudyMaterial' };
    }
  } catch (error) {
    console.error('Error in deleteCourseStudyMaterial:', error);
    throw error;
  }
};

export const updateCourseStudyMaterial = async (data) => {
  try {
    const response = await axios.put(`${COURSE_STUDY_MATERIALS_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseStudyMaterial updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseStudyMaterial' };
    }
  } catch (error) {
    console.error('Error in updateCourseStudyMaterial:', error);
    throw error;
  }
};

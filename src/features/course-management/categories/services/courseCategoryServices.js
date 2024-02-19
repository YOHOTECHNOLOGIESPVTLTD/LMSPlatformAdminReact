// groupService.js
import axios from 'axios';

const COURSE_CATEGORY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/course-management/course-categories`;

export const getAllCourseCategories = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${COURSE_CATEGORY_API_END_POINT}/read`, {
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
      throw new Error(`Failed to fetch CourseCategories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchCourseCategories = async (searchQuery) => {
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
    console.error('Error in searchCourseCategories:', error);
    throw error;
  }
};

export const addCourseCategory = async (data) => {
  try {
    const response = await axios.post(`${COURSE_CATEGORY_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'CourseCategory created successfully' };
    } else {
      return { success: false, message: 'Failed to create CourseCategory' };
    }
  } catch (error) {
    console.error('Error in addCourseCategory:', error);
    throw error;
  }
};

export const deleteCourseCategory = async (courseCategoryId) => {
  try {
    const response = await axios.delete(`${COURSE_CATEGORY_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: courseCategoryId }
    });

    if (response.data.status) {
      return { success: true, message: 'CourseCategory deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete CourseCategory' };
    }
  } catch (error) {
    console.error('Error in deleteCourseCategory:', error);
    throw error;
  }
};

export const updateCourseCategory = async (data) => {
  try {
    const response = await axios.post(`${COURSE_CATEGORY_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseCategory' };
    }
  } catch (error) {
    console.error('Error in updateCourseCategory:', error);
    throw error;
  }
};

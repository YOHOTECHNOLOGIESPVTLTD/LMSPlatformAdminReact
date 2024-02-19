// NotesService.js
import axios from 'axios';

const COURSE_NOTE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/content-management/course-notes`;

export const getAllCourseNotes = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${COURSE_NOTE_API_END_POINT}/read`, {
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
      throw new Error(`Failed to fetch CourseNotes. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseNotes:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchCourseNotes = async (searchQuery) => {
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
    console.error('Error in searchCourseNotes:', error);
    throw error;
  }
};

export const addCourseNote = async (data) => {
  try {
    const response = await axios.post(`${COURSE_NOTE_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'CourseNote created successfully' };
    } else {
      return { success: false, message: 'Failed to create CourseNote' };
    }
  } catch (error) {
    console.error('Error in addCourseNote:', error);
    throw error;
  }
};

export const deleteCourseNote = async (courseNoteId) => {
  try {
    const response = await axios.delete(`${COURSE_NOTE_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: courseNoteId }
    });

    if (response.data.status) {
      return { success: true, message: 'CourseNote deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete CourseNote' };
    }
  } catch (error) {
    console.error('Error in deleteCourseNote:', error);
    throw error;
  }
};

export const updateCourseNote = async (data) => {
  try {
    const response = await axios.put(`${COURSE_NOTE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseNote updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseNote' };
    }
  } catch (error) {
    console.error('Error in updateCourseNote:', error);
    throw error;
  }
};

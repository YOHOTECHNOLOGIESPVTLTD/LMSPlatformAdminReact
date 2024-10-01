// groupService.js
import axios from 'axios';
import Client from "api/index"

const FAQ_CATEGORY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/platform-management/platform-faq-modules`;

export const getActiveFaqCategories = async (data) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}/show-active-faq-modules`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch FaqCategories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllFaqCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getAllFaqCategorywithFaq = async () => {
  try {
    const response = await Client.faq_category.get()

    console.log(response);

    // Check if the response status is successful
    if (response.data.success) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Faq categories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Faq categories:', error);

    // Throw the error again to propagate it to the calling function/component
    // throw error;
  }
};

export const getAllFaqCategories = async (data) => {
  try {
    const response = await Client.faq_category.get(data)

    console.log(response);

    // Check if the response status is successful
    if (response.data.success) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Faq categories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Faq categories:', error);

    // Throw the error again to propagate it to the calling function/component
    // throw error;
  }
};

export const searchFaqCategories = async (searchQuery) => {
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
    console.error('Error in searchFaqCategories:', error);
    throw error;
  }
};

export const addFaqCategory = async (data) => {
  try {
    const response = await Client.faq_category.create(data)
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'FaqCategory created successfully' };
    } else {
      return { success: false, message: 'Failed to create FaqCategory' };
    }
  } catch (error) {
    console.error('Error in addFaqCategory:', error);
    throw error;
  }
};

export const deleteFaqCategory = async (data) => {
  try {
    const response = await Client.faq_category.delete(data)

    if (response.data.status) {
      return { success: true, message: 'FaqCategory deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete FaqCategory' };
    }
  } catch (error) {
    console.error('Error in deleteFaqCategory:', error);
    throw error;
  }
};
export const updateStatusFaqCategory = async (data) => {
  try {
    const response = await Client.faq_category.update(data)

    if (response.data.status) {
      return { success: true, message: 'FaqCategory status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update status FaqCategory' };
    }
  } catch (error) {
    console.error('Error in update statusFaqCategory:', error);
    throw error;
  }
};

export const updateFaqCategory = async (data) => {
  try {
    const response = await Client.faq_category.update(data)

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'FaqCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update FaqCategory' };
    }
  } catch (error) {
    console.error('Error in updateFaqCategory:', error);
    throw error;
  }
};

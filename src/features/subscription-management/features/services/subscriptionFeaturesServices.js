// SubscriptionFeatureService.js
import axios from 'axios';

const SUBSCRIPTION_FEATURE_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/subscription-management/subscription-plans`;

export const getAllSubscriptionFeatures = async () => {
  try {
    const response = await axios.get(`${SUBSCRIPTION_FEATURE_END_POINT}/read-by-branch-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch SubscriptionFeatures. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllSubscriptionFeatures:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchSubscriptionFeatures = async (searchQuery) => {
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
    console.error('Error in searchSubscriptionFeatures:', error);
    throw error;
  }
};

export const addSubscriptionFeature = async (data) => {
  try {
    const response = await axios.post(`${SUBSCRIPTION_FEATURE_END_POINT}/create`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('add-subscription:',response)
    if (response.data.status) {
      return { success: true, message: 'SubscriptionFeature created successfully' };
    } else {
      return { success: false, message: 'Failed to create SubscriptionFeature' };
    }
  } catch (error) {
    console.error('Error in addSubscriptionFeature:', error);
    throw error;
  }
};

export const deleteSubscriptionFeature = async (SubscriptionFeatureId) => {
  try {
    const response = await axios.delete(`${SUBSCRIPTION_FEATURE_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: SubscriptionFeatureId }
    });

    if (response.data.status) {
      return { success: true, message: 'SubscriptionFeature deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete SubscriptionFeature' };
    }
  } catch (error) {
    console.error('Error in deleteSubscriptionFeature:', error);
    throw error;
  }
};

export const updateSubscriptionFeature = async (data) => {
  try {
    const response = await axios.post(`${SUBSCRIPTION_FEATURE_END_POINT}/update`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log('response:',response);
      return { success: true, message: 'SubscriptionFeature updated successfully' };
    } else {
      return { success: false, message: 'Failed to update SubscriptionFeature' };
    }
  } catch (error) {
    console.error('Error in updateSubscriptionFeature:', error);
    throw error;
  }
};

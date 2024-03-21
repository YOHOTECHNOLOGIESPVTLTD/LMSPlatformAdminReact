// SubscriptionPlanService.js
import axios from 'axios';

const SUBSCRIPTION_PLAN_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/SubscriptionPlan-management/student-fees`;

export const getAllSubscriptionPlans = async () => {
  try {
    const response = await axios.get(`${SUBSCRIPTION_PLAN_END_POINT}/read-by-branch-id`, {
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
      throw new Error(`Failed to fetch SubscriptionPlans. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllSubscriptionPlans:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchSubscriptionPlans = async (searchQuery) => {
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
    console.error('Error in searchSubscriptionPlans:', error);
    throw error;
  }
};

export const addSubscriptionPlan = async (data) => {
  try {
    const response = await axios.post(`${SUBSCRIPTION_PLAN_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'SubscriptionPlan created successfully' };
    } else {
      return { success: false, message: 'Failed to create SubscriptionPlan' };
    }
  } catch (error) {
    console.error('Error in addSubscriptionPlan:', error);
    throw error;
  }
};

export const deleteSubscriptionPlan = async (SubscriptionPlanId) => {
  try {
    const response = await axios.delete(`${SUBSCRIPTION_PLAN_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: SubscriptionPlanId }
    });

    if (response.data.status) {
      return { success: true, message: 'SubscriptionPlan deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete SubscriptionPlan' };
    }
  } catch (error) {
    console.error('Error in deleteSubscriptionPlan:', error);
    throw error;
  }
};

export const updateSubscriptionPlan = async (data) => {
  try {
    const response = await axios.put(`${SUBSCRIPTION_PLAN_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'SubscriptionPlan updated successfully' };
    } else {
      return { success: false, message: 'Failed to update SubscriptionPlan' };
    }
  } catch (error) {
    console.error('Error in updateSubscriptionPlan:', error);
    throw error;
  }
};

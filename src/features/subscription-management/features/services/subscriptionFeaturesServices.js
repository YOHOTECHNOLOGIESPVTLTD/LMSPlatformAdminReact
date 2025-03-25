import axios from 'axios';

const API_URL = "http://localhost:3001/api/subscription"; 

export const addSubscriptionFeature = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authorization token found. Please log in again.");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${API_URL}/plan`, data, { headers });

    return {
      success: true,
      message: "Subscription Plan created successfully",
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please log in again.");
      }
      throw new Error(error.response.data?.message || "Something went wrong.");
    } else if (error.request) {
      throw new Error("No response from server. Check your internet connection.");
    } else {
      throw new Error(error.message);
    }
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Authorization token is missing");
  
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getAllSubscriptionFeatures = async () => {
  try {
    const response = await axios.get(`${API_URL}/read-by-branch-id`, {
      headers: getAuthHeaders(),
    });

    if (response.data.status) {
      return response.data; // Returning only the necessary data
    } else {
      throw new Error(`Failed to fetch Subscription Features. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getAllSubscriptionFeatures:', error);
    throw error.response?.data || new Error('Something went wrong while fetching subscription features.');
  }
};

export const searchSubscriptionFeatures = async (searchQuery) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      headers: getAuthHeaders(),
      params: { search: searchQuery },
    });

    return response.data ? { success: true, data: response.data } : { success: false, message: 'No results found' };
  } catch (error) {
    console.error('Error in searchSubscriptionFeatures:', error);
    throw error.response?.data || new Error('Something went wrong while searching subscription features.');
  }
};

export const deleteSubscriptionFeature = async (SubscriptionFeatureId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, {
      headers: getAuthHeaders(),
      params: { id: SubscriptionFeatureId },
    });

    return response.data.status
      ? { success: true, message: 'Subscription Feature deleted successfully' }
      : { success: false, message: 'Failed to delete Subscription Feature' };
  } catch (error) {
    console.error('Error in deleteSubscriptionFeature:', error);
    throw error.response?.data || new Error('Something went wrong while deleting the subscription feature.');
  }
};

export const updateSubscriptionFeature = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/update`, data, {
      headers: getAuthHeaders(),
    });

    return response.data.status
      ? { success: true, message: 'Subscription Feature updated successfully' }
      : { success: false, message: 'Failed to update Subscription Feature' };
  } catch (error) {
    console.error('Error in updateSubscriptionFeature:', error);
    throw error.response?.data || new Error('Something went wrong while updating the subscription feature.');
  }
};

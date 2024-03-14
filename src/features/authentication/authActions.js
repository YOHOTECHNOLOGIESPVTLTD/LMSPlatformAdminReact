// authActions.js
import axios from 'axios';
import toast from 'react-hot-toast';

const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/platform-user/login`;
const LOGOUT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/platform-user/logout`;

export const login = (username, password) => async (dispatch) => {
  let data = {
    username: username,
    password: password
  };
  try {
    // Make API request to login
    const response = await axios.post(LOGIN_API_ENDPOINT, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);

    if (response.data.status) {
      // Store token and user ID in localStorage
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
      localStorage.setItem('permissions', JSON.stringify(response.data.permission));
      // Dispatch success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.data.token,
          userData: response.data.userData,
          permissions: response.data.permission
        }
      });
      window.location.replace('/');
      toast.success('Login Successful');
      return { success: true, message: 'Login successfully' };
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: response.data.message
      });
      toast.error(response.data.message);
      return { success: false, message: 'Failed to delete group' };
    }
  } catch (error) {
    // Dispatch error action
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response.data.message
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Make API request to login
    const response = await axios.post(
      LOGOUT_API_ENDPOINT,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log(response);
    if (response.data.status) {
      // Remove token and user ID from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('permissions');
      localStorage.removeItem('isAuthenticated');

      // Dispatch logout action
      dispatch({
        type: 'LOGOUT',
        payload: {
          message: response.data.message
        }
      });
      window.location.replace('/login');
      toast.success('Logout Successful');
    }
  } catch (error) {
    // Dispatch error action
    dispatch({
      type: 'LOGOUT_FAILURE',
      payload: error.response.data.message
    });
  }
};

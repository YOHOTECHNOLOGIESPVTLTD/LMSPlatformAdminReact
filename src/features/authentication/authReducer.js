// authReducer.js
const getLocalStorageItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return null;
  }
};

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  token: localStorage.getItem('token') || null,
  userData: getLocalStorageItem('userData') || null,
  permissions: getLocalStorageItem('permissions') || null,
  errorMessage: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userData: action.payload.userData,
        permissions: action.payload.permissions,
        errorMessage: ''
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        permissions: null,
        errorMessage: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        permissions: null,
        errorMessage: ''
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem('token') || null,
        userData: getLocalStorageItem('userData') || null,
        permissions: getLocalStorageItem('permissions') || null,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;

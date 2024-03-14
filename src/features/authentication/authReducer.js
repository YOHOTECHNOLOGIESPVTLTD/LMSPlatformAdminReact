// authReducer.js
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') || false,
  token: localStorage.getItem('token') || null,
  userData: JSON.parse(localStorage.getItem('userData')) || null,
  permissions: JSON.parse(localStorage.getItem('permissions')) || null,
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
        userData: JSON.parse(localStorage.getItem('userData')) || null,
        permissions: JSON.parse(localStorage.getItem('userData')) || null,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;

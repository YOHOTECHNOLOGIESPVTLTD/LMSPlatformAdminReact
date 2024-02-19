// authReducer.js
const branches = JSON.parse(localStorage.getItem('branches'));
const selectedBranchId = localStorage.getItem('selectedBranchId');
const haveBranchId = () => {
  if (branches) {
    if (selectedBranchId) {
      return selectedBranchId;
    } else {
      return branches[0]?.branch_id;
    }
  } else {
    return null;
  }
};

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') || false,
  token: localStorage.getItem('token') || null,
  userData: JSON.parse(localStorage.getItem('userData')) || null,
  permissions: JSON.parse(localStorage.getItem('userData')) || null,
  branches: JSON.parse(localStorage.getItem('branches')) || null,
  selectedBranchId: haveBranchId(),
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
        branches: action.payload.branches,
        selectedBranchId: action.payload.branches[0]?.branch_id,
        errorMessage: ''
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        permissions: null,
        branches: null,
        selectedBranchId: null,
        errorMessage: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        permissions: null,
        branches: null,
        selectedBranchId: null,
        errorMessage: ''
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem('token') || null,
        userData: JSON.parse(localStorage.getItem('userData')) || null,
        permissions: JSON.parse(localStorage.getItem('userData')) || null,
        branches: JSON.parse(localStorage.getItem('branches')) || null,
        selectedBranchId: JSON.parse(localStorage.getItem('branches'))[0]?.branchId || null,
        errorMessage: action.payload
      };
    case 'UPDATE_SELECTED_BRANCH':
      return {
        ...state,
        selectedBranchId: action.payload
      };
    case 'UPDATE_BRANCH':
      return {
        ...state,
        branches: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;

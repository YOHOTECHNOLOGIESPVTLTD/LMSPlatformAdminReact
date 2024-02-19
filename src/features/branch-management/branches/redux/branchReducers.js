// branchesReducer.js
const initialState = {
  branches: [],
  loading: false
};

const branchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BRANCHES':
      return {
        ...state,
        branches: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateBranches = (branches) => ({
  type: 'UPDATE_BRANCHES',
  payload: branches
});

export default branchesReducer;

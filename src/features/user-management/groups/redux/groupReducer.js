// groupsReducer.js
const initialState = {
  groups: [],
  loading: false
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GROUPS':
      return {
        ...state,
        groups: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateGroups = (groups) => ({
  type: 'UPDATE_GROUPS',
  payload: groups
});

export default groupsReducer;

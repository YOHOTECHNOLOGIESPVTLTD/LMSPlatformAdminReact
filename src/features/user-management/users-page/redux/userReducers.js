// usersReducer.js
const initialState = {
  users: [],
  loading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateUsers = (users) => ({
  type: 'UPDATE_USERS',
  payload: users
});

export default usersReducer;

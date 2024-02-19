// allNotificationsReducer.js
const initialState = {
  allNotifications: [],
  loading: false
};

const allNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_NOTIFICATIONS':
      return {
        ...state,
        allNotifications: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateAllNotifications = (allNotifications) => ({
  type: 'UPDATE_ALL_NOTIFICATIONS',
  payload: allNotifications
});

export default allNotificationsReducer;

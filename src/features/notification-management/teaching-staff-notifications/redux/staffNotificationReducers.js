// staffNotificationsReducer.js
const initialState = {
  staffNotifications: [],
  loading: false
};

const staffNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STAFF_NOTIFICATIONS':
      return {
        ...state,
        staffNotifications: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updatesStaffNotifications = (staffNotifications) => ({
  type: 'UPDATE_STAFF_NOTIFICATIONS',
  payload: staffNotifications
});

export default staffNotificationsReducer;

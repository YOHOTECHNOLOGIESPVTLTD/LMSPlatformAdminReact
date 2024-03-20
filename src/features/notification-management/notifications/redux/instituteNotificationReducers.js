// instituteNotificationsReducer.js
const initialState = {
  instituteNotifications: [],
  loading: false
};

const instituteNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INSTITUTE_NOTIFICATIONS':
      return {
        ...state,
        instituteNotifications: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateinstituteNotifications = (instituteNotifications) => ({
  type: 'UPDATE_INSTITUTE_NOTIFICATIONS',
  payload: instituteNotifications
});

export default instituteNotificationsReducer;

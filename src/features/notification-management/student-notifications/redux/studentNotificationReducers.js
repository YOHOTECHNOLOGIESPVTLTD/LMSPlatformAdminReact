// studentNotificationsReducer.js
const initialState = {
  studentNotifications: [],
  loading: false
};

const studentNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_NOTIFICATIONS':
      return {
        ...state,
        studentNotifications: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentNotifications = (studentNotifications) => ({
  type: 'UPDATE_STUDENT_NOTIFICATIONS',
  payload: studentNotifications
});

export default studentNotificationsReducer;

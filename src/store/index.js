// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import auth from 'features/authentication/authReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';
import userReducer from 'features/user-management/users/redux/userSlices';
import studentNotificationsReducer from 'features/notification-management/student-notifications/redux/studentNotificationSlice';
import staffNotificationsReducer from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationSlice';
import allNotificationsReducer from 'features/notification-management/all-notifications/redux/allNotificationSlice';
import calendar from 'features/calender/redux/reducers';
import customerSupportsReducer from 'features/help-center/customer-support/redux/customerSupportSlice';
import technicalSupportsReducer from 'features/help-center/technical-support/redux/technicalSupportSlice';

import chats from 'features/chat/redux/chatSlicees';
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    chat: chats,
    groups: groupReducer,
    users: userReducer,
    studentNotifications: studentNotificationsReducer,
    staffNotifications: staffNotificationsReducer,
    allNotifications: allNotificationsReducer,
    consumerSupports: customerSupportsReducer,
    technicalSupport: technicalSupportsReducer,
    calendar: calendar,
    auth: auth
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };

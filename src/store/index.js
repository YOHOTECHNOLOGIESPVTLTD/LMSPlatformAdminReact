import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import auth from 'features/authentication/authReducer';
import groupReducer from 'features/user-management/groups-page/redux/groupSlice';
import userReducer from 'features/user-management/users-page/redux/userSlices';
import studentNotificationsReducer from 'features/notification-management/student-notifications/redux/studentNotificationSlice';
import staffNotificationsReducer from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationSlice';
import allNotificationsReducer from 'features/notification-management/all-notifications/redux/allNotificationSlice';
import calendar from 'features/calender/redux/reducers';
import customerSupportsReducer from 'features/help-center/customer-support/redux/customerSupportSlice';
import technicalSupportsReducer from 'features/help-center/technical-support/redux/technicalSupportSlice';

import chats from 'features/chat/redux/chatSlicees';
import instituteReducer from 'features/institute-management/redux/instituteSlice';
import paymentReducer from 'features/payment-management/payments-page/redux/paymentSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    chat: chats,
    groups: groupReducer,
    users: userReducer,
    institutes: instituteReducer,
    payments: paymentReducer,
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

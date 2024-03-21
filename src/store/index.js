import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import auth from 'features/authentication/authReducer';
import groupReducer from 'features/user-management/groups-page/redux/groupSlice';
import userReducer from 'features/user-management/users-page/redux/userSlices';

import calendar from 'features/calender/redux/reducers';
import customerSupportsReducer from 'features/help-center/customer-support/redux/customerSupportSlice';
import technicalSupportsReducer from 'features/help-center/technical-support/redux/technicalSupportSlice';

import chats from 'features/chat/redux/chatSlicees';
import instituteReducer from 'features/institute-management/redux/instituteSlice';
import paymentReducer from 'features/payment-management/payments-page/redux/paymentSlice';
import faqSlice from 'features/faq-management/faqs/redux/faqSlice';
import faqCategorySlice from 'features/faq-management/faq-categories/redux/faqCategorySlice';
import allNotificationSlice from 'features/notification-management/notifications/redux/instituteNotificationSlice';
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    chat: chats,
    groups: groupReducer,
    users: userReducer,
    institutes: instituteReducer,
    payments: paymentReducer,
    consumerSupports: customerSupportsReducer,
    technicalSupport: technicalSupportsReducer,
    calendar: calendar,
    auth: auth,
    faqCategories: faqCategorySlice,
    faqs: faqSlice,
    instituteNotifications: allNotificationSlice
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };

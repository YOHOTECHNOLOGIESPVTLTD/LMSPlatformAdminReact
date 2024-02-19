// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import auth from 'features/authentication/authReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';
import userReducer from 'features/user-management/users/redux/userSlices';
import batchReducer from 'features/batch-management/batches/redux/batchSlice';
import branchReducer from 'features/branch-management/branches/redux/branchSlice';
import courseCategoryReducer from 'features/course-management/categories/redux/courseCategorySlice';
import courseReducer from 'features/course-management/courses/redux/courseSlice';
import courseStudyMaterialsReducer from 'features/content-management/course-contents/study-materials/redux/studyMaterialSlice';
import courseNotesReducer from 'features/content-management/course-contents/notes/redux/noteSlice';
import courseModulesReducer from 'features/content-management/course-contents/modules/redux/moduleSlice';
import teachingStaffsReducer from 'features/staff-management/teaching-staffs/redux/teachingStaffSlice';
import nonTeachingStaffsReducer from 'features/staff-management/non-teaching-staffs/redux/nonTeachingStaffSlice';
import studentsReducer from 'features/student-management/students/redux/studentSlice';
import offlineClassesReducer from 'features/class-management/offline-classes/redux/offlineClassSlice';
import liveClassesReducer from 'features/class-management/live-classes/redux/liveClassSlice';
import studentAttendancesReducer from 'features/attandence-management/student-attandences/redux/studentAttendanceSlice';
import teachingStaffAttendancesReducer from 'features/attandence-management/teaching-staff-attandences/redux/teachingStaffAttendanceSlice';
import nonTeachingStaffAttendancesReducer from 'features/attandence-management/non-teaching-staff-attandences/redux/nonTeachingStaffAttendanceSlice';
import studentFeesReducer from 'features/payment-management/fees/redux/studentFeeSlice';
import teachingStaffSalariesReducer from 'features/payment-management/salaries/teaching-staffs/redux/teachingStaffSalariesSlice';
import nonTeachingStaffSalariesReducer from 'features/payment-management/salaries/non-teaching-staffs/redux/nonTeachingStaffSalariesSlice';
import studentFeeRefundsReducer from 'features/refund-management/refunds/redux/studentFeeRefundSlice';

import studentNotificationsReducer from 'features/notification-management/student-notifications/redux/studentNotificationSlice';
import staffNotificationsReducer from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationSlice';
import allNotificationsReducer from 'features/notification-management/all-notifications/redux/allNotificationSlice';

import studentCertificatesReducer from 'features/certificate-management/student-certificates/redux/studentCertificateSlice';
import calendar from 'features/calender/redux/reducers';
import studentIdCardsReducer from 'features/id-card-management/student-id-cards/redux/studentIdcardSlice';
import staffIdCardsReducer from 'features/id-card-management/staff-id-cards/redux/staffIdcardSlice';

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
    batches: batchReducer,
    branches: branchReducer,
    courseCategories: courseCategoryReducer,
    courseStudyMaterials: courseStudyMaterialsReducer,
    courseNotes: courseNotesReducer,
    courseModules: courseModulesReducer,
    courses: courseReducer,
    teachingStaffs: teachingStaffsReducer,
    nonTeachingStaffs: nonTeachingStaffsReducer,
    students: studentsReducer,
    offlineClasses: offlineClassesReducer,
    liveClasses: liveClassesReducer,
    studentAttendances: studentAttendancesReducer,
    teachingStaffAttendances: teachingStaffAttendancesReducer,
    nonTeachingStaffAttendances: nonTeachingStaffAttendancesReducer,
    studentFees: studentFeesReducer,
    teachingStaffSalaries: teachingStaffSalariesReducer,
    nonTeachingStaffSalaries: nonTeachingStaffSalariesReducer,
    studentFeeRefunds: studentFeeRefundsReducer,
    studentNotifications: studentNotificationsReducer,
    staffNotifications: staffNotificationsReducer,
    allNotifications: allNotificationsReducer,
    studentCertificates: studentCertificatesReducer,
    studentIdCards: studentIdCardsReducer,
    staffIdCards: staffIdCardsReducer,
    consumerSupports: customerSupportsReducer,
    technicalSupport: technicalSupportsReducer,
    calendar: calendar,
    auth: auth
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };

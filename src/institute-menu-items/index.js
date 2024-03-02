import dashboard from './dashboard';
import userManagement from './user-management';
import branchManagement from './branch-management';
import staffManagement from './staff-management';
import studentManagement from './student-management';
import courseManagement from './course-management';
import contentManagement from './content-management';
import classManagement from './class-management';
// import examManagement from './exam-management';
import attendanceManagement from './attendance-management';
import paymentManagement from './payment-management';
import batchManagement from './batch-management';
import refundManagement from './refund-management';
import certificateManagement from './certificate-management';
import IdCardManagement from './id-cards-management';
// import resultManagement from './result-management';
import allNotifications from './notification-management';
import helpCenter from './help-center';
import community from './community';
import ticketManagement from './ticket-management'
import FaqManagement from './faq-management';
// import calender from './calender'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    community,
    branchManagement,
    userManagement,
    courseManagement,
    contentManagement,
    staffManagement,
    studentManagement,
    batchManagement,
    classManagement,
    attendanceManagement,
    // resultManagement,
    paymentManagement,
    refundManagement,
    allNotifications,
    certificateManagement,
    IdCardManagement,
    helpCenter,
    ticketManagement,
    FaqManagement
  ]
};

export default menuItems;

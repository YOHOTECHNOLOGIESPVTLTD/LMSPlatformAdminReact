import dashboard from './dashboard';
import userManagement from './user-management';
import PaymentManagement from './payment-management';
import instituteManagement from './institute-management';
import helpCenter from './help-center';
// import taxManagement from './tax-management'
// import discountManagement from './discount-management';
import notificationManagement from './notification-management';
import subscriptionManagement from './subscription-management';
import FaqManagement from './faq-management';
import TicketManagement from './ticket-management';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    userManagement,
    instituteManagement,
    PaymentManagement,
    subscriptionManagement,
    helpCenter,
    notificationManagement,
    FaqManagement,
    TicketManagement
  ]
};

export default menuItems;

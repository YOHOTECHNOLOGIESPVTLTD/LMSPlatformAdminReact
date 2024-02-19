import dashboard from './dashboard';
import userManagement from './user-management';
import instituteManagement from './institute-management';
import taxManagement from './tax-management';
import discountManagement from './discount-management';
import notificationManagement from './notification-management';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, userManagement, instituteManagement, taxManagement, discountManagement, notificationManagement]
};

export default menuItems;

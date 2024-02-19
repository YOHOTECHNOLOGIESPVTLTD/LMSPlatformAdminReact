import dashboard from './dashboard';
import userManagement from './user-management';
import instituteManagement from './institute-management';
import taxManagement from './tax-management'
import discountManagement from './discount-management';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, userManagement, instituteManagement,taxManagement,discountManagement]
};

export default menuItems;

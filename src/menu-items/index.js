import dashboard from './dashboard';
import userManagement from './user-management'
import PaymentManagement from "./payment-management"
import instituteManagement from './institute-management';
import helpCenter from './help-center';
import taxManagement from './tax-management'
import discountManagement from './discount-management';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, userManagement, instituteManagement,taxManagement,discountManagement,PaymentManagement, helpCenter]
};

export default menuItems;

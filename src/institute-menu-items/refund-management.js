// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash,IconReceiptRefund } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconReceiptRefund
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'refund-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Refund Management',
      type: 'collapse',
      icon: icons.IconReceiptRefund,

      children: [
        {
          id: 'fees',
          title: 'Fees',
          type: 'item',
          url: '/refund-management/refunds',
          icon: icons.IconReceiptRefund,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

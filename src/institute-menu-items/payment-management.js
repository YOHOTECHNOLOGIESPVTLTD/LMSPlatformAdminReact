// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'payment-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Payment Management',
      type: 'collapse',
      icon: icons.IconCash,

      children: [
        {
          id: 'fees',
          title: 'Fees',
          type: 'item',
          url: '/payment-management/fees',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'salaries',
          title: 'Salaries',
          type: 'item',
          url: '/payment-management/salaries',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'subscriptions',
          title: 'Subscriptions',
          type: 'item',
          url: '/payment-management/subscriptions',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

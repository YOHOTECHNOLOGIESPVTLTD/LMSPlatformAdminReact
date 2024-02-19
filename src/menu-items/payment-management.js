// assets
import { IconCash,IconBuildingBank,IconStar } from '@tabler/icons';

// constant
const icons = {
  IconCash,
  IconBuildingBank,
  IconStar
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'payment-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Payments',
      type: 'collapse',
      icon: icons.IconBuildingBank,

      children: [
        {
          id: 'fee',
          title: 'Fee',
          type: 'item',
          url: '/payment-management/fee',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'salary',
          title: 'Salary',
          icon: icons.IconCash,
          type: 'item',
          url: '/payment-management/salary',
          target: false,
          breadcrumbs: false
        },
        {
          id: 'subscription',
          title: 'Subscription',
          icon: icons.IconStar,
          type: 'item',
          url: '/payment-management/subscription',
          target: false,

          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

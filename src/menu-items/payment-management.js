// assets
import { IconCash } from '@tabler/icons';

// constant
const icons = {
  IconCash,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'payment-management',
  title: '',
  type: 'group',

  children: [
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      icon:icons.IconCash,
      url: '/payment-management/payments',
      target: false,
      breadcrumbs: false
    }
  ]
};

export default pages;


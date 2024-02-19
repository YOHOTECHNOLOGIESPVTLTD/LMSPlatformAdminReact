// assets
import { IconDiscount2 } from '@tabler/icons';

// constant
const icons = {
  IconDiscount2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'discount-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'discounts',
      title: 'Discounts',
      type: 'item',
      icon: icons.IconDiscount2,
      url: '/discount-management/discounts',
      target: false,
      breadcrumbs: false
    }
  ]
};

export default pages;

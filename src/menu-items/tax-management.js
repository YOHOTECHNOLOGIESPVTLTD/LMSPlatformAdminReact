// assets
import { IconReceiptTax } from '@tabler/icons';

// constant
const icons = {
  IconReceiptTax
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'tax-management',
  title: '',
  type: 'group',

  children: [
    {
      id: 'taxes',
      title: 'Taxes',
      type: 'item',
      icon:icons.IconReceiptTax,
      url: '/tax-management/taxes',
      target: false,
      breadcrumbs: false
    }
  ]
};

export default pages;

// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash,IconHelp } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconHelp
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'faq-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Faq Management',
      type: 'collapse',
      icon: icons.IconHelp,
      children: [
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          url: '/faq-management/categories',
          icon: icons.IconHelp,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'Faqs',
          title: 'Faqs',
          type: 'item',
          url: '/faq-management/faqs',
          icon: icons.IconHelp,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

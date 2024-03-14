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
  id: 'help-center',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Help Center',
      type: 'collapse',
      icon: icons.IconHelp,

      children: [
        {
          id: 'customer-support',
          title: 'Customer Support',
          type: 'item',
          url: '/help-center/customer-support',
          icon: icons.IconHelp,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'technical-support',
          title: 'Technical Support',
          type: 'item',
          url: '/help-center/technical-support',
          icon: icons.IconHelp,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

// assets
import { IconNotification } from '@tabler/icons';

// constant
const icons = {
  IconNotification
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'notification-management',
  title: '',
  type: 'group',

  children: [
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      icon: icons.IconNotification,
      url: '/notification-management/notifications',
      target: false,
      breadcrumbs: false
    }
  ]
};

export default pages;

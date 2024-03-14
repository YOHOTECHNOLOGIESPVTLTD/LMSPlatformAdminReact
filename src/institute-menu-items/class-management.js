// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconChalkboard } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconChalkboard
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'class-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Class Management',
      type: 'collapse',
      icon: icons.IconChalkboard,

      children: [
        {
          id: 'offline-classes',
          title: 'Offline Classes',
          icon: IconUser,
          type: 'item',
          url: '/class-management/offline-classes',
          target: false,

          breadcrumbs: false
        },
        {
          id: 'live-classes',
          title: 'Live Classes',
          icon: IconUser,
          type: 'item',
          url: '/class-management/live-classes',
          target: false,

          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

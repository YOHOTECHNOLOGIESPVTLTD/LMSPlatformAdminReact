// assets
import { IconKey, IconShieldLock, IconUser, IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'user-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'User Management',
      type: 'collapse',
      icon: icons.IconShieldLock,

      children: [
        {
          id: 'groups',
          title: 'Groups',
          type: 'item',
          url: '/institute-management/institutes/:id/user-management/groups',
          icon: icons.IconUsers,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'users',
          title: 'Users',
          icon: IconUser,
          type: 'item',
          url: '/institute-management/institutes/:id/user-management/users',
          target: false,

          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

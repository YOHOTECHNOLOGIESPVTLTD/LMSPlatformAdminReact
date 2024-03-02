// assets
import { IconKey, IconShieldLock, IconUser, IconUsers,IconSchool } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconSchool
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'student-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Student Management',
      type: 'collapse',
      icon: icons.IconSchool,

      children: [
        {
          id: 'students',
          title: 'Students',
          type: 'item',
          url: '/student-management/students',
          icon: icons.IconSchool,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

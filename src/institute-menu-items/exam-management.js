// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, } from '@tabler/icons';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'exam-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Exam Management',
      type: 'collapse',
      icon: icons.IconShieldLock,

      children: [
        {
          id: 'online-exams',
          title: 'Online Exams',
          type: 'item',
          url: '/exam-management/online-exams',
          icon: icons.IconUsers,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'offline-exams',
          title: 'Offline Exams',
          icon: IconUser,
          type: 'item',
          url: '/exam-management/offline-exams',
          target: false,

          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

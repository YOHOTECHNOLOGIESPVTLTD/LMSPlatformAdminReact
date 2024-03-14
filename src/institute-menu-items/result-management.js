// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash,IconTrophy } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconTrophy
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'result-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Result Management',
      type: 'collapse',
      icon: icons.IconTrophy,

      children: [
        {
          id: 'online-exams-results',
          title: 'Online Exams Results',
          type: 'item',
          url: '/result-management/online-exam-results',
          icon: icons.IconTrophy,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'offline-exams-results',
          title: 'Offline Exams Results',
          type: 'item',
          url: '/result-management/offline-exam-results',
          icon: icons.IconTrophy,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

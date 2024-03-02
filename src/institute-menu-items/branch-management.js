// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconGitBranch } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconGitBranch
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'branch-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Branch Management',
      type: 'collapse',
      icon: icons.IconGitBranch,

      children: [
        {
          id: 'branches',
          title: 'Branches',
          type: 'item',
          url: '/branch-management/branches',
          icon: icons.IconGitBranch,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

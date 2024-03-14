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
  id: 'batch-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Batch Management',
      type: 'collapse',
      icon: icons.IconGitBranch,

      children: [
        {
          id: 'batches',
          title: 'Batches',
          type: 'item',
          url: '/batch-management/batches',
          icon: icons.IconGitBranch,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash,IconCertificate,IconCertificate2 } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconCertificate,
  IconCertificate2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'certificate-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Certificate Management',
      type: 'collapse',
      icon: icons.IconCertificate,

      children: [
        {
          id: 'student-certificates',
          title: 'Student Certificates',
          type: 'item',
          url: '/certificate-management/student-certificates',
          icon: icons.IconCertificate2,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

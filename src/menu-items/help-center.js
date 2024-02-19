// assets
import { IconKey, IconHelp, IconTicket } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconHelp,
  IconTicket
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'help-center',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Help center',
      type: 'collapse',
      icon: icons.IconHelp,

      children: [
        {
          id: 'helps',
          title: 'Helps',
          icon: icons.IconHelp,
          type: 'item',
          url: '/help-center/helps',
          target: false,
          breadcrumbs: false
        },
        {
          id: 'tickets',
          title: 'Tickets',
          type: 'item',
          url: '/help-center/tickets',
          target: false,
          icon: icons.IconTicket,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;

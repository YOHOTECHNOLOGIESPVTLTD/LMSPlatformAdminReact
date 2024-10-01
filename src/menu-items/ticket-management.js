// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconHelp, IconTicket } from '@tabler/icons';
// import { hasPermission } from 'hooks/hasPermissions';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconHelp,
  IconTicket
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'ticket-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Ticket Management',
      type: 'collapse',
      icon: icons.IconTicket,

      children: [
        // {
        //   id: "institute-tickets",
        //   title : "Institute Tickets",
        //   type: "item",
        //   url: "/ticket-management/institute-tickets",
        //   icon : icons.IconTicket,
        //   target: false,
        //   breadcrumbs: false
        // },
        {
          id: 'your-ticket',
          title: 'Your-Ticket',
          type: 'item',
          url: '/ticket-management/your-ticket',
          icon: icons.IconTicket,
          target: false,
          breadcrumbs: false
          // visible: hasPermission('inst_perm_student_ticket_view')
        },
      ]
    }
  ]
};

export default pages;

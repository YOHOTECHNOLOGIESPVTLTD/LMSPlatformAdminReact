// assets
import { IconCalendar } from '@tabler/icons';

// constant
const icons = { IconCalendar };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const calender = {
  id: 'calender',
  title: '',
  type: 'group',
  children: [
    {
      id: 'calender',
      title: 'Calender',
      type: 'item',
      url: '/calender',
      icon: icons.IconCalendar,
      breadcrumbs: false
    }
  ]
};

export default calender;

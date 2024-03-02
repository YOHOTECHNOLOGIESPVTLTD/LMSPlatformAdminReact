// assets
import { IconBuildingCommunity } from '@tabler/icons';

// constant
const icons = { IconBuildingCommunity };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const community = {
  id: 'communities',
  title: '',
  type: 'group',
  children: [
    {
      id: 'communities',
      title: 'Community',
      type: 'item',
      url: '/community-management/community',
      icon: icons.IconBuildingCommunity,
      breadcrumbs: false
    }
  ]
};

export default community;

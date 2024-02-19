// assets
import { IconBuildingCottage } from '@tabler/icons';

// constant
const icons = {
  IconBuildingCottage
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'institute-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'institutes',
      title: 'Institutes',
      icon:icons.IconBuildingCottage,
      type: 'item',
      url: '/institute-management/institutes',
      target: false,
      breadcrumbs: false
    }
  ]
};

export default pages;

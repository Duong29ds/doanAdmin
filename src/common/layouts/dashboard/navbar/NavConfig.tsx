// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  setting: getIcon('ic_menu_item'),
  policy: getIcon('ic_policy'),
  document: getIcon('ic_policy'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  {
    subheader: 'app',
    items: [
      {
        title: 'System statistic',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.blog,
        info: <Label color="error">+32</Label>,
      }
    ],
  },
  {
    subheader: 'dashboard',
    items: [
      {
        title: 'product',
        path: PATH_DASHBOARD.general.product.root,
        icon: ICONS.ecommerce,
        children: [
          {
            title: 'product list',
            path: PATH_DASHBOARD.general.product.root,
          },
          {
            title: 'add product',
            path: PATH_DASHBOARD.general.product.new,
          },
        ],
      },
      {
        title: 'supplier',
        path: PATH_DASHBOARD.general.supplier.root,
        icon: ICONS.ecommerce,
        children: [
          {
            title: 'supplier list',
            path: PATH_DASHBOARD.general.supplier.root,
          },
          {
            title: 'add supplier',
            path: PATH_DASHBOARD.general.supplier.new,
          },
        ],
      },
      {
        title: 'portfolio',
        path: PATH_DASHBOARD.general.portfolio.root,
        icon: ICONS.ecommerce,
        children: [
          {
            title: 'portfolio list',
            path: PATH_DASHBOARD.general.portfolio.root,
          },
          {
            title: 'add portfolio',
            path: PATH_DASHBOARD.general.portfolio.new,
          },
        ],
      },
      {
        title: 'order',
        path: PATH_DASHBOARD.general.order.root,
        icon: ICONS.ecommerce,
        children: [
          {
            title: 'portfolio list',
            path: PATH_DASHBOARD.general.order.root,
          },
        ],
      },
    ],
  },
];

export default navConfig;

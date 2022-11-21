// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    product: {
      root: path(ROOTS_DASHBOARD, '/product'),
      new: path(ROOTS_DASHBOARD, '/product/new'),
      edit: (id: number) => path(ROOTS_DASHBOARD, `/product/${id}/edit`),
    },
    supplier: {
      root: path(ROOTS_DASHBOARD, '/supplier'),
      new: path(ROOTS_DASHBOARD, '/supplier/new'),
      edit: (id: number) => path(ROOTS_DASHBOARD, `/supplier/${id}/edit`),
    },
    portfolio: {
      root: path(ROOTS_DASHBOARD, '/portfolio'),
      new: path(ROOTS_DASHBOARD, '/portfolio/new'),
      edit: (id: number) => path(ROOTS_DASHBOARD, `/portfolio/${id}/edit`),
    },
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
};

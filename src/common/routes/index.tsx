import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// config
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  const { pathname } = useLocation();

  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'product', element: <ProductList /> },
        { path: 'product/new', element: <AddProduct /> },
        { path: 'supplier', element: <SupplyList /> },
        { path: 'supplier/new', element: <AddSupply /> },
        { path: 'portfolio', element: <PortfolioList /> },
        { path: 'portfolio/new', element: <AddPortfolio /> },
        { path: 'portfolio/:id/edit', element: <EditPortfolio /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const AddProduct = Loadable(
  lazy(() => import('../../product/add-product/components/AddProduct'))
);

const ProductList = Loadable(
  lazy(() => import('../../product/product-list/components/ProductList'))
);

const AddSupply = Loadable(
  lazy(() => import('../../supply/add-supply/components/AddSupply'))
);

const SupplyList = Loadable(
  lazy(() => import('../../supply/supply-list/components/SupplyList'))
);

const PortfolioList = Loadable(
  lazy(() => import('../../portfolio/portfolio-list/components/PortfolioList'))
);

const AddPortfolio = Loadable(
  lazy(() => import('../../portfolio/add-portfolio/components/AddPortfolio'))
);

const EditPortfolio = Loadable(
  lazy(() => import('../../portfolio/edit-portfolio/components/EditPortfolio'))
);

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

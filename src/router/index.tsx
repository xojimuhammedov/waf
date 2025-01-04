import DashboardPage from 'pages/DashboardPage';
import LoginPage from 'pages/LoginPage';
import SitesPage from 'pages/SitesPage';

export const PublicRoutes = [
  {
    path: '/login',
    element: <LoginPage />
  }
];

export const PrivateRoutes = [
  {
    path: '/',
    element: <DashboardPage />
  },
  {
    path: '/sites',
    element: <SitesPage />
  }
];

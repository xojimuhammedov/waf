import DashboardPage from 'pages/DashboardPage';
import LoginPage from 'pages/LoginPage';

export const PublicRoutes = [
  {
    path: '/login',
    element: <DashboardPage />
  }
];

export const PrivateRoutes = [
  {
    path: '/',
    element: <DashboardPage />
  }
];

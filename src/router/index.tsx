import DashboardPage from 'pages/DashboardPage';
import LoginPage from 'pages/LoginPage';

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
  }
];

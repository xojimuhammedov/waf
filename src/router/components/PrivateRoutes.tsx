import storage from 'services/storage';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, path }: any) => {
  const token = storage.get('accessToken');

  const protectRole = () => {
    if (token) {
      return children;
    } else {
      return <Navigate to={'/login'} replace />;
    }
  };

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  return protectRole();
};

export default PrivateRoute;

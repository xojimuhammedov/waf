import DashboardLayout from 'components/Layouts/DashboardLayout';

import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from 'router';
import storage from 'services/storage';
import PrivateRoute from './components/PrivateRoutes';
import { useDarkMode } from 'context/DarkLightContext';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import Loading from 'components/Layouts/DashboardLayout/Loading';
import Components404 from 'components/Layouts/DashboardLayout/404';

function AppRoutes() {
  const [loading, setLoading] = useState<boolean>(false);
  const token = storage.get('accessToken');
  const darkLight = storage.get('theme');
  const { darkMode }: any = useDarkMode();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={twMerge(darkLight === 'dark' ? 'dark' : 'light')}>
      {/* {token ? <DashboardLayout setLoading={setLoading} /> : ''} */}
      <Routes>
        {PublicRoutes.map((evt: any, key: number) => (
          <Route key={key} path={evt.path} element={evt.element} />
        ))}
        {PrivateRoutes.map((evt: any, key: number) => (
          <Route
            key={key}
            path={evt.path}
            element={
              <>
                <DashboardLayout setLoading={setLoading} />
                <PrivateRoute>{evt.element}</PrivateRoute>
              </>
            }
          />
        ))}
        <Route path="*" element={<Components404 />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;

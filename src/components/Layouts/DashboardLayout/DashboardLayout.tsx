import { Outlet } from 'react-router-dom';
import Header from './Header';

const DashboardLayout = ({ setLoading }: any) => {
  return (
    <div>
      <div
        style={{ background: '#202020', borderBottom: '1px solid #2B2B2B' }}
        className=" fixed top-0 z-10 flex h-[72px] w-full items-center px-5">
        <Header setLoading={setLoading} />
      </div>

      <div className="relative mt-[72px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

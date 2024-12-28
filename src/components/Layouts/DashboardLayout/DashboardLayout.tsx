import { Outlet } from 'react-router-dom';
import Header from './Header';

const DashboardLayout = ({ setLoading }: any) => {
  return (
    <div className={'w-screen h-screen flex flex-col items-center justify-center'}>
      <div
        style={{ borderBottom: '1px solid #2B2B2B' }}
        className="h-[72px]  w-full flex-shrink-0 px-5 bg-[#202020]">
        <Header setLoading={setLoading} />
      </div>
      <div className="flex-shrink-1 h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

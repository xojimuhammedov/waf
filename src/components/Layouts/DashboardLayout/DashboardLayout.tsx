import { Link, Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import MyModal from 'components/Atoms/MyModal';
import storage from 'services/storage';

const DashboardLayout = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleLogOut = () => {
    storage.remove('accessToken');
    window.location.reload();
    <Navigate to={'/login'} />;
  };
  return (
    <>
      <div className={'flex h-screen w-screen flex-col items-center justify-center'}>
        <div
          style={{ borderBottom: '1px solid #2B2B2B' }}
          className="h-[72px]  w-full flex-shrink-0 bg-[#202020] px-5">
          <Header setOpen={setOpen} />
        </div>
        <div className="flex-shrink-1 h-full w-full">
          <Outlet />
        </div>
      </div>
      <MyModal
        modalProps={{
          show: Boolean(open),
          onClose: () => {
            setOpen(false);
          },
          className: 'modal-navbar'
        }}
        headerProps={{
          children: null,
          className: 'w-full'
        }}
        bodyProps={{
          children: (
            <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="flex flex-col items-center justify-center gap-6">
                <Link
                  onClick={() => setOpen(false)}
                  className="modal-link text-3xl uppercase text-[#91a0b7] hover:text-white"
                  to={'/'}>
                  REal time dashboard
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="modal-link text-3xl uppercase text-[#91a0b7] hover:text-white"
                  to={'/sites'}>
                  statistika
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="modal-link text-3xl uppercase text-[#91a0b7] hover:text-white"
                  to={'/sites'}>
                  hisobotlar
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="modal-link text-3xl uppercase text-[#91a0b7] hover:text-white"
                  to={'/sites'}>
                  saytlarni boshqarish
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="modal-link text-3xl uppercase text-[#91a0b7] hover:text-white"
                  to={'/sites'}>
                  rollarni boshqarish
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="modal-link text-3xl uppercase text-[#91a0b7] hover:text-white"
                  to={'/sites'}>
                  sozlamalar
                </Link>
                <p
                  onClick={handleLogOut}
                  className="modal-link cursor-pointer text-3xl uppercase text-[#91a0b7] hover:text-white">
                  Tizimdan chiqish
                </p>
                <div
                  className="navbar-close-modal m-auto flex w-full items-center justify-center text-lg text-black"
                  onClick={() => setOpen(false)}>
                  Qaytish
                </div>
              </div>
            </div>
          ),
          className: ''
        }}
      />
    </>
  );
};

export default DashboardLayout;

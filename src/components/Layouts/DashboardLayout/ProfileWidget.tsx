import FirstCapitalLetter from 'components/Atoms/FirstCapitalLetter/FirstCapitalLetter';
import { LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import storage from 'services/storage';
import AlertModal from './AlertModal';
import config from 'configs';
import MyAvatar from 'components/Atoms/MyAvatar';
import AvatarImage from 'assets/icons/avatar.jpg';

const ProfileWidget = () => {
  
  const userDataString: string | null = storage.get('userData');
  const userData: any = userDataString ? JSON.parse(userDataString) : {};
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    storage.remove('accessToken');
    window.location.reload();
  };

  const imageUrl = userData?.avatar ? `${config.FILE_URL}${userData?.avatar?.url}` : AvatarImage;

  return (
    <>
      <div onClick={() => setOpen(!open)} className="flex cursor-pointer items-center">
        <FirstCapitalLetter name={userData?.username || ''} />
        <p className="text-c-m-p dark:text-subtext-color-dark">{userData?.username}</p>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-2 top-14 flex w-[120px] w-[217px] cursor-pointer flex-col justify-center rounded-lg  bg-white px-4 py-3 shadow-md dark:bg-bg-dark-bg">
          <div className="flex items-center gap-2">
            <MyAvatar size="medium" imageUrl={imageUrl} />
            <div>
              <h2 className="text-base font-medium">{userData?.username}</h2>
              <p className="text-subtle font-inter text-sm">{userData?.role?.name}</p>
            </div>
          </div>
          <span onClick={() => setOpenAlert(true)} className="flex items-center gap-2 pt-6">
            <LogOut stroke="#E11D48" />
            <h3 className="text-sm font-medium text-red-600">{'Sign Out'}</h3>
          </span>
        </div>
      )}

      <AlertModal
        onClose={() => setOpenAlert(false)}
        handleLogOut={handleLogOut}
        show={openAlert}
      />
    </>
  );
};

export default ProfileWidget;

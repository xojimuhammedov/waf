import LogoSvg from 'assets/icons/waf-logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuButton from 'assets/icons/MenuButton';
import MyTailwindPicker from 'components/Atoms/Form/MyTailwindDatePicker';
import { Calendar } from 'lucide-react';

const Navbar = ({ setLoading }: any) => {
  const now = new Date();
  const [value, setValue] = useState<any>({
    startDate: null,
    endDate: null
  });

  const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${now.getFullYear()} ${now
    .getHours()
    .toString()
    .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <nav className="flex h-full w-full items-center justify-between">
        <div className="mr-5 flex items-center justify-center rounded-m dark:border-dark-line dark:bg-bg-dark-bg">
          <Link to={'/'}>
            <img src={LogoSvg} alt="" />
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div
            style={{ border: '0.5px solid rgba(255, 255, 255, 0.20)' }}
            className="flex flex h-[40px] w-[88px] cursor-pointer items-center items-center justify-center gap-2 rounded-lg">
            <p className="text-sm text-white">Menu</p>
            <MenuButton />
          </div>
          <div className="w-[320px] navbar-picker">
            <MyTailwindPicker
              useRange={false}
              placeholder={'01.12.2024 - 20.12.2024'}
              value={value}
              className='navbar-picker'
              onChange={handleValueChange}
              startIcon={<Calendar stroke="#9096A1" />}
            />
          </div>
          <p style={{ color: '#78EDA2' }} className="cursor-pointer text-xl">
            {formattedDate}
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

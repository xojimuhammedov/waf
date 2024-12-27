import IconByName from 'assets/icons/IconByName';
import clsx from 'clsx';
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { icons } from 'lucide-react';

type SubItem = {
  label: string;
  to: string;
  icon: keyof typeof icons;
};

type MenuItem = {
  label: string;
  to: string;
  isSubMenu: boolean;
  subRoutes?: SubItem[];
};

type CustomDropdownMenuProps = {
  menuItem: MenuItem;
};

const CustomDropdownMenu = ({ menuItem, setOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative h-[100%]" ref={dropdownRef}>
      <NavLink
        onClick={(event) => {
          toggleDropdown();
          event.preventDefault();
        }}
        className={({ isActive }) =>
          clsx([
            'flex h-full items-center px-[12px]  text-s-p dark:text-subtext-color-dark',
            isActive && 'text-text-base'
          ])
        }
        to={menuItem.to}>
        {menuItem.label}
        <IconByName
          name={'ChevronDown'}
          className={twMerge(
            'ml-[6px] h-4 w-4 cursor-pointer text-text-subtle transition-all duration-300',
            isOpen ? '-rotate-180' : '',
            window.location.pathname.includes(menuItem.to) ? 'text-bg-brand' : ''
          )}
        />
      </NavLink>

      {isOpen && (
        <ul className="shadow-gray-150 absolute z-50 w-52 bg-white shadow-md dark:bg-bg-dark-bg">
          {get(menuItem, 'subRoutes', []).map((i: SubItem, index: number) => {
            return (
              <li key={index} onClick={() => handleOptionClick()}>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx([
                      'flex items-center rounded-m p-3 text-s-p font-normal dark:text-subtext-color-dark',
                      isActive && 'text-text-base'
                    ])
                  }
                  to={i.to}>
                  {/* <IconByName
                    name={i.icon}
                    className={'mr-2 h-5 w-5 cursor-pointer text-text-subtle'}
                  /> */}
                  {i.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const NavMobileMenu = ({ setOpen }: any) => {
  

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      to: '/',
      isSubMenu: false
    },
    {
      label: 'Attendances',
      to: '/attendances',
      isSubMenu: true,
      subRoutes: [
        {
          label: 'Attendances',
          to: '/attendances/list',
          icon: 'AppWindow'
        },
        {
          label: 'Attendance Reason',
          to: '/attendances/reasons',
          icon: 'AppWindow'
        },
        {
          label: 'Guests',
          to: '/attendances/guests',
          icon: 'AppWindow'
        }
      ]
    },
    {
      label: 'Monitoring',
      to: '/monitoring',
      isSubMenu: true,
      subRoutes: [
        {
          label: 'Applications monitoring',
          to: '/monitoring/applications',
          icon: 'AppWindow'
        },
        {
          label: 'Keystroke monitoring',
          to: '/monitoring/keystroke',
          icon: 'AppWindow'
        },
        {
          label: 'Screenshots monitoring',
          to: '/monitoring/screenshot',
          icon: 'AppWindow'
        }
      ]
    },
    {
      label: 'Reports',
      to: '/reports',
      isSubMenu: true,
      subRoutes: [
        {
          label: 'TimeSheet',
          to: '/reports/timesheet',
          icon: 'Globe'
        },
        {
          label: 'Attendance',
          to: '/reports/attendance',
          icon: 'Globe'
        },
        {
          label: 'Full Check In/Out',
          to: '/reports/report-history',
          icon: 'AppWindow'
        },
        {
          label: 'Early/Late Checks',
          to: '/reports/report-late',
          icon: 'Server'
        }
      ]
    },
    {
      label: 'Organization',
      to: '/employees',
      isSubMenu: true,
      subRoutes: [
        {
          label: 'Employees',
          to: '/employees/list',
          icon: 'AppWindow'
        },
        {
          label: 'Departments',
          to: '/employees/departments',
          icon: 'AppWindow'
        },
        {
          label: 'Work schedule',
          to: '/employees/policy',
          icon: 'AppWindow'
        },
        {
          label: 'Employees position',
          to: '/employees/job-position',
          icon: 'AppWindow'
        }
      ]
    },

    {
      label: 'Settings',
      to: '/settings',
      isSubMenu: false
    }
  ];

  return (
    <ul className="flex flex-col gap-5">
      {menuItems.map((menuItem, i) => {
        return (
          <li key={i} className="flex h-full items-center">
            {menuItem.isSubMenu ? (
              <>
                <CustomDropdownMenu setOpen={setOpen} menuItem={menuItem} />
              </>
            ) : (
              <>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx([
                      'flex h-full items-center px-[12px] text-s-p dark:text-subtext-color-dark',
                      isActive && 'text-text-base'
                    ])
                  }
                  to={menuItem.to}>
                  {menuItem.label}
                </NavLink>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavMobileMenu;

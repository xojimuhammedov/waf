import React from 'react';
import Navbar from './Navbar';

const Header = ({ setOpen }: any) => {
  return (
    <header className="flex h-full w-full items-center">
      <Navbar setOpen={setOpen} />
    </header>
  );
};

export default Header;

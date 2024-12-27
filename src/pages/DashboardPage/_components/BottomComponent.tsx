import HujumIcon from 'assets/icons/HujumIcon';
import React from 'react';

function BottomComponent() {
  return (
    <div>
      <p className='text-lg font-medium'>TOP Hujum turlari</p>
      <div>
        <p
          style={{ background: 'rgba(51, 51, 51, 0.7)' }}
          className="flex h-[32px] items-center gap-2 rounded px-2 text-white">
          <HujumIcon />
          Nigeriya
        </p>
      </div>
    </div>
  );
}

export default BottomComponent;

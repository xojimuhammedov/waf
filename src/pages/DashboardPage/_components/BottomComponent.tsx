import HujumIcon from 'assets/icons/HujumIcon';
import React from 'react';

function BottomComponent() {
  return (
    <div className="flex gap-8">
      <div className="w-full bottom-left">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujumchi davlatlar
        </p>
        <div className="mb-2 flex items-center justify-between">
          <p className="bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white">
            Nigeriya
          </p>
          <p className="text-sm text-white">153 780</p>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p className="bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white">
            Kolumbiya
          </p>
          <p className="text-sm text-white">153 780</p>
        </div>
      </div>
      <div className="w-full">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujum turlari
        </p>
        <div className="mb-2 flex items-center justify-between">
          <p className="bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white">
            <HujumIcon />
            DDoS hujum
          </p>
          <p className="text-sm text-white">153 780</p>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p className="bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white">
            <HujumIcon />
            SQL injekshen
          </p>
          <p className="text-sm text-white">153 780</p>
        </div>
      </div>
    </div>
  );
}

export default BottomComponent;

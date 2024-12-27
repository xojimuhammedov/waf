import HujumIcon from 'assets/icons/HujumIcon';
import React from 'react';
import { countryData, hujumData } from 'services/country';

function BottomComponent() {
  return (
    <div className="flex gap-8 px-10 pt-4">
      <div className="bottom-left w-full">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujumchi davlatlar
        </p>
        {countryData?.map((item, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <p
              style={{ width: item?.process }}
              className={
                'bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white'
              }>
              <img src={item.img} className="h-6 w-6 rounded-full object-cover" alt="" />
              {item?.title}
            </p>
            <p className="text-sm text-white">{item?.count}</p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujum turlari
        </p>
        {hujumData.map((item, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <p
              style={{ width: item?.process }}
              className="bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white">
              <HujumIcon />
              {item?.title}
            </p>
            <p className="text-sm text-white">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomComponent;

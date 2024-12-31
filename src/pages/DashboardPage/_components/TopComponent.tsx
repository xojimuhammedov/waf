import React, { useState } from 'react';
import D3Map from '../../../components/Molecules/3d/D3Map';
import dayjs from 'dayjs';

function TopComponent() {
  const [attackCountries, setAttackCountries] = useState<object[]>([]);

  const handleAttackCountriesChange = (country: object) => {
    setAttackCountries((prevCountries) => {
      prevCountries.unshift(country);
      return prevCountries.slice(0, 4);
    });
  }

  // console.log(attackCountries)

  return (
    <div className={'h-full relative'}>
      <div className={'rounded px-3 absolute h-[250px] w-[400px] bg-[#00000077]'}>
        {attackCountries.map((value: any, index: number) => <div
          key={`${index}-${value}`}
          className={'flex pt-3 px-3 d-flex items-center'}>
          <div className="vibrate me-4"></div>
          <div>
            <div className={'text-lg text-[#919191]'}>{value.name}</div>
            <div>{dayjs(value.date).format("YYYY-MM-DD HH:mm:ss")}</div>
          </div>
        </div>)}
      </div>
      <D3Map setAttackCountries={handleAttackCountriesChange} />
    </div>
  );
}

export default TopComponent;

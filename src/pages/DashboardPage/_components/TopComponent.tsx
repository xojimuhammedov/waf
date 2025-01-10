import React, { useEffect, useState } from 'react';
import D3Map from '../../../components/Molecules/3d/D3Map';
import dayjs from 'dayjs';
import { forEach } from 'lodash';

function TopComponent() {
  const [attackCountries, setAttackCountries] = useState<object[]>([]);
  const [currentTime, setRealTime] = useState<string>('');

  useEffect(() => {
    // Dastlabki vaqtni o'rnatish
    updateTime();
    
    // Har sekundda yangilab turish
    const timer = setInterval(() => {
      updateTime();
    }, 1000);

    // Component unmount bo'lganda intervalni tozalash
    return () => clearInterval(timer);
  }, []);

  // Vaqtni yangilash funksiyasi
  const updateTime = () => {
    const now = new Date();
    setRealTime(now.toLocaleTimeString('uz-UZ', { hour12: false }));
  };

  const handleAttackCountriesChange = (country: object) => {
    setAttackCountries((prevCountries) => {
      const updatedCountries = [country, ...prevCountries]; // Yangi massiv yaratadi
      
      return updatedCountries.slice(0, 4); // Faqat oxirgi 4 elementni saqlaydi
    });
  }

   // console.log(attackCountries)

  return (
     <div className={'h-full relative'} >
      <div className={'rounded px-3 absolute h-[250px] w-[400px] bg-[#00000077]'} style={{margin: 20, zIndex: 100}}>
        {attackCountries.map((value: any, index: number) => <div
          key={`${index}-${value}`}
          className={'flex pt-3 px-3 d-flex items-center'}>
          <div className="vibrate me-4"></div>
          <div>
            <div className={'text-md text-[#919191]'}>{value.name}
              <span className={'italic text-m text-[#919191] mg'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value.city}</span>
            </div>
            <div>{value.ip_address} 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className={'text-xs'}>{dayjs(value.date).format("YYYY-MM-DD HH:mm:ss")}</i>
            </div>
          </div>
        </div>)}
      </div>
      <div className={'absolute h-[50px] w-[200px] time-display'}>
        {currentTime}
      </div>
      <D3Map setAttackCountries={handleAttackCountriesChange} />
    </div>
  );
}

//<div></div>
export default TopComponent;

import HujumIcon from 'assets/icons/HujumIcon';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import dayjs from 'dayjs';
import { useGetAllQuery } from 'hooks/api';
import { get } from 'lodash';
import { useEffect, useState } from 'react';

function BottomComponent() {
  const [dateRange, setDateRange] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem('dateRange') || '{}');
    return {
      startDate: storedValue?.startDate
        ? dayjs(storedValue.startDate).add(5, 'hour').format('YYYY-MM-DD')
        : dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'),
      endDate: storedValue?.endDate
        ? dayjs(storedValue.endDate).add(5, 'hour').format('YYYY-MM-DD')
        : dayjs(new Date()).format('YYYY-MM-DD')
    };
  });

  const updateDateRangeFromLocalStorage = () => {
    const storedValue = JSON.parse(localStorage.getItem('dateRange') || '{}');
    setDateRange({
      startDate: storedValue?.startDate
        ? dayjs(storedValue.startDate).add(5, 'hour').format('YYYY-MM-DD')
        : dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'),
      endDate: storedValue?.endDate
        ? dayjs(storedValue.endDate).add(5, 'hour').format('YYYY-MM-DD')
        : dayjs(new Date()).format('YYYY-MM-DD')
    });
  };

  // LocalStorage ni kuzatish
  useEffect(() => {
    const interval = setInterval(() => {
      const storedValue = JSON.parse(localStorage.getItem('dateRange') || '{}');
      if (
        storedValue?.startDate !== dateRange.startDate ||
        storedValue?.endDate !== dateRange.endDate
      ) {
        updateDateRangeFromLocalStorage();
      }
    }, 100); // Har 100ms da o'zgarishni tekshirish

    return () => clearInterval(interval); // Intervalni tozalash
  }, [dateRange]);
  const { data } = useGetAllQuery({
    key: KEYS.getStatisticsType,
    url: URLS.getStatisticsType,
    params: {
      from: dateRange.startDate,
      to: dateRange.endDate
    }
  });

  const { data: countriesData } = useGetAllQuery({
    key: KEYS.getStatisticsCountries,
    url: URLS.getStatisticsCountries,
    params: {
      from: dateRange.startDate,
      to: dateRange.endDate
    }
  });
  return (
    <div className="flex gap-8 px-10 pt-2">
      <div className="bottom-left w-1/2">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujum manbalari
        </p>
        {countriesData?.data?.map((item: any, index: number) => (
          <div key={index} className="bottom-card relative mb-2 flex items-center justify-between">
            <p className="bottom-items flex h-[32px] cursor-pointer items-center gap-2 px-2 text-sm text-white">
              <img
                src={`/flags/icon/${item?.country_code?.trim()}.png`}
                className="bottom-items h-6 w-6 rounded-full object-cover"
                alt=""
              />
              {item?.country_name_en}
            </p>
            <div
              style={{ width: `${item?.procent}%` }}
              className="bottom-item cursor-pointer rounded"></div>
            <p className="text-sm text-white">{item?.country_count}</p>
          </div>
        ))}
      </div>
      <div className="w-1/2">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujum turlari
        </p>
        {get(data, 'data')?.map((item: any, index: number) => (
          <div key={index} className="bottom-card relative mb-2 flex items-center justify-between">
            <p className="bottom-items flex h-[32px] cursor-pointer items-center gap-2 px-2 text-sm text-white">
              <HujumIcon />
              {item?.type}
            </p>
            <div
              style={{ width: `${item?.procent}%` }}
              className="bottom-item cursor-pointer rounded"></div>
            <p className="text-sm text-white">{item?.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomComponent;

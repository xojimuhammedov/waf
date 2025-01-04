import HujumIcon from 'assets/icons/HujumIcon';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import dayjs from 'dayjs';
import { useGetAllQuery } from 'hooks/api';
import { get } from 'lodash';

function BottomComponent() {
  const storedValue: any = JSON.parse(localStorage.getItem('dateRange') || '{}');
  const { data } = useGetAllQuery({
    key: KEYS.getStatisticsType,
    url: URLS.getStatisticsType,
    params: {
      from: dayjs(storedValue?.startDate).add(5, 'hour').format('YYYY-MM-DD'),
      to: dayjs(storedValue.endDate).add(5, 'hour').format('YYYY-MM-DD')
    }
  });

  const { data: countriesData } = useGetAllQuery({
    key: KEYS.getStatisticsCountries,
    url: URLS.getStatisticsCountries,
    params: {
      from: dayjs(storedValue?.startDate).add(5, 'hour').format('YYYY-MM-DD'),
      to: dayjs(storedValue.endDate).add(5, 'hour').format('YYYY-MM-DD')
    }
  });
  return (
    <div className="flex gap-8 px-10 pt-4">
      <div className="bottom-left w-1/2">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujum manbalari
        </p>
        {countriesData?.data?.map((item: any, index: number) => (
          <div key={index} className="bottom-card relative mb-2 flex items-center justify-between">
            <p className="bottom-items flex h-[32px] cursor-pointer items-center gap-2 px-2 text-sm text-white">
              <img
                src={`${item.image_src}`}
                className="bottom-items h-6 w-6 rounded-full object-cover"
                alt=""
              />
              {item?.country_name_en}
            </p>
            <div
              style={{ width: `${item?.country_count > 550 ? 550 : item?.country_count}px` }}
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
              style={{ width: `${item?.count > 550 ? 550 : item?.count}px` }}
              className="bottom-item cursor-pointer rounded"></div>
            <p className="text-sm text-white">{item?.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomComponent;

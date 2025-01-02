import HujumIcon from 'assets/icons/HujumIcon';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import { useDateRange } from 'context/DatePickerContext';
import dayjs from 'dayjs';
import { useGetAllQuery } from 'hooks/api';
import { get } from 'lodash';
import { countryData } from 'services/country';

function BottomComponent() {
  const value: any = useDateRange();
  const { data } = useGetAllQuery({
    key: KEYS.getStatisticsType,
    url: URLS.getStatisticsType,
    params: {
      from:
        dayjs(value?.value?.startDate).format('YYYY-MM-DD') == 'Invalid Date'
          ? dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD')
          : dayjs(value?.value?.startDate).format('YYYY-MM-DD'),
      to:
        dayjs(value?.value?.endDate).format('YYYY-MM-DD') == 'Invalid Date'
          ? dayjs(new Date()).format('YYYY-MM-DD')
          : dayjs(value?.value?.endDate).format('YYYY-MM-DD')
    }
  });
  return (
    <div className="flex gap-8 px-10 pt-4">
      <div className="bottom-left w-1/2">
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
      <div className="w-1/2">
        <p style={{ color: '#A3A3A3' }} className="mb-4 text-lg font-medium">
          TOP Hujum turlari
        </p>
        {get(data, 'data')?.map((item: any, index: number) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <p
              style={{ width: item?.count }}
              className="bottom-item flex h-[32px] cursor-pointer items-center gap-2 rounded px-2 text-sm text-white">
              <HujumIcon />
              {item?.type}
            </p>
            <p className="text-sm text-white">{item?.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomComponent;

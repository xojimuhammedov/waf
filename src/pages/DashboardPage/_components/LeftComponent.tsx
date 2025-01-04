import LineChart from 'components/Molecules/Chart';
import ApexChart from 'components/Molecules/LineChart/LineChart';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import { useDateRange } from 'context/DatePickerContext';
import dayjs from 'dayjs';
import { useGetAllQuery } from 'hooks/api';
import { get } from 'lodash';
import { useSearchParams } from 'react-router-dom';

function LeftComponent() {
  const [params] = useSearchParams();
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const countData: any = [];
  const onTime: any = [];

  const hostName: any = [];
  const hostCount: any = [];

  const { data } = useGetAllQuery({
    key: KEYS.getStatisticsAccessLogs,
    url: URLS.getStatisticsAccessLogs,
    params: {
      from:
        startDate == 'Invalid Date'
          ? dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD')
          : startDate,
      to: endDate == 'Invalid Date' ? dayjs(new Date()).format('YYYY-MM-DD') : endDate
    }
  });

  get(data, 'data.xronology')?.map((item: any) => {
    countData.push(Number(item.count));
  });
  get(data, 'data.xronology')?.map((item: any) => {
    onTime.push(dayjs(item.date).format('DD.MM.YYYY'));
  });

  get(data, 'data.by_host')?.map((item: any) => {
    hostCount.push(Number(item.count));
  });
  get(data, 'data.by_host')?.map((item: any) => {
    hostName.push(item.host);
  });
  return (
    <div className="flex h-full w-full flex-col">
      <div style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }} className="flex-1">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Barcha so’rovlar
        </p>
        <h3 className="mb-20 mt-2 pl-10 text-5xl font-medium text-white">
          {get(data, 'data.total')}
        </h3>
      </div>
      <div className="flex-1" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
        <p style={{ color: '#A3A3A3' }} className="pl-10 pt-9 text-lg font-medium">
          Saytlar bo’yicha so’rovlar
        </p>
        <LineChart
          className={'text-base'}
          hostName={hostName}
          hostCount={hostCount}
          title="Saytlar bo’yicha so’rovlar"
        />
      </div>
      <div className="flex-1 pt-9">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          So’rovlar dinamikasi
        </p>
        <ApexChart countData={countData} title="So’rovlar dinamikasi" time={onTime} />
      </div>
    </div>
  );
}

export default LeftComponent;

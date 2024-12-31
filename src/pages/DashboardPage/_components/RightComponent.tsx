import LineChart from 'components/Molecules/Chart';
import ApexChart from 'components/Molecules/LineChart/LineChart';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import { useDateRange } from 'context/DatePickerContext';
import dayjs from 'dayjs';
import { useGetAllQuery } from 'hooks/api';
import { get } from 'lodash';

function RightComponent() {
  const value: any = useDateRange();
  const process = ['Step 1', 'Step 2', 'Step 3'];
  const countData: any = [];
  const onTime: any = [];

  const hostName: any = [];
  const hostCount: any = [];

  const { data } = useGetAllQuery({
    key: KEYS.getStatisticsAttacks,
    url: URLS.getStatisticsAttacks,
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

  get(data, 'data.xronology')?.map((item: any) => {
    countData.push(item.count);
  });
  get(data, 'data.xronology')?.map((item: any) => {
    onTime.push(dayjs(item.date).format('DD.MM.YYYY'));
  });

  get(data, 'data.by_host')
    ?.slice(0, 3)
    ?.map((item: any) => {
      hostCount.push(Number(item.count));
    });
  get(data, 'data.by_host')
    ?.slice(0, 3)
    ?.map((item: any) => {
      hostName.push(item.host);
    });

  return (
    <div className="flex h-full w-full flex-col">
      <div style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }} className="flex-1">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Barcha hujumlar
        </p>
        <h3 className="mb-20 mt-2 pl-10 text-5xl font-medium text-white">
          {get(data, 'data.total')}
        </h3>
      </div>
      <div className="flex-1" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
        <p style={{ color: '#A3A3A3' }} className="pl-10 pt-9 text-lg font-medium">
          Saytlar bo’yicha hujumlar
        </p>
        {/* <LineChart
          className={'text-base'}
          hostName={hostName}
          hostCount={hostCount}
          title="Saytlar bo’yicha hujumlar"
        /> */}
      </div>
      <div className="flex-1 pt-9">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Hujumlar dinamikasi
        </p>
        <ApexChart countData={countData} title="hujumlar dinamikasi" time={onTime} />
      </div>
    </div>
  );
}

export default RightComponent;

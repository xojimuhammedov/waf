import LineChart from 'components/Molecules/Chart';
import ApexChart from 'components/Molecules/LineChart/LineChart';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import dayjs from 'dayjs';
import { useGetAllQuery } from 'hooks/api';
import { get } from 'lodash';

function RightComponent() {
  const process = ['Step 1', 'Step 2', 'Step 3'];
  const countData: any = [];
  const onTime: any = [];

  const { data } = useGetAllQuery({
    key: KEYS.getStatisticsAttacks,
    url: URLS.getStatisticsAttacks,
    params: {
      from: dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'),
      to: dayjs(new Date()).format('YYYY-MM-DD')
    }
  });

  get(data, 'data.xronology')?.forEach((item: any) => {
    countData.push(item.count);
  });
  get(data, 'data.xronology')?.forEach((item: any) => {
    onTime.push(dayjs(item.date).format('DD.MM.YYYY'));
  });

  return (
    <div className="w-full">
      <div style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }} className="">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Barcha hujumlar
        </p>
        <h3 className="mb-20 mt-2 pl-10 text-5xl font-medium text-white">
          {' '}
          {get(data, 'data.total')}
        </h3>
      </div>
      <div className="mt-9" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Saytlar bo’yicha hujumlar
        </p>
        <LineChart
          xAxis={{ data: process }}
          height="300px"
          type="bar"
          className={'text-base'}
          series={[]}
        />
      </div>
      <div className="mt-9">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Hujumlar xronologiyasi
        </p>
        <ApexChart countData={countData} time={onTime} title="Hujumlar xronologiyasi" />
      </div>
    </div>
  );
}

export default RightComponent;

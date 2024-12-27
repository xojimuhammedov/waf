import LineChart from 'components/Molecules/Chart';
import ApexChart from 'components/Molecules/LineChart/LineChart';

function RightComponent() {
  const process = ['Step 1', 'Step 2', 'Step 3'];
  return (
    <div>
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }} className="">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Barcha hujumlar
        </p>
        <h3 className="pl-10 text-3xl font-medium text-white">634</h3>
        <ApexChart />
      </div>
      <div className="mt-9" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Saytlar bo’yicha hujumlar
        </p>
        <LineChart
          xAxis={{ data: process }}
          height="180px"
          type="bar"
          className={'text-base'}
          series={[
            {
              data: [15, 36, 45],
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: '#0C5B74'
                    },
                    {
                      offset: 1,
                      color: '#000'
                    }
                  ],
                  global: false
                }
              }
            }
          ]}
        />
      </div>
      <div className="mt-9">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Hujumlar xronologiyasi
        </p>
        <ApexChart />
      </div>
    </div>
  );
}

export default RightComponent;

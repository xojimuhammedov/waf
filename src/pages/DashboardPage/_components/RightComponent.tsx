import LineChart from 'components/Molecules/Chart';
import ApexChart from 'components/Molecules/LineChart/LineChart';

function RightComponent() {
  const process = ['Step 1', 'Step 2', 'Step 3'];
  return (
    <div className="w-full">
      <div style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }} className="">
        <p style={{ color: '#A3A3A3' }} className="pl-10 text-lg font-medium">
          Barcha hujumlar
        </p>
        <h3 className="pl-10 mb-20 mt-2 text-5xl font-medium text-white">634</h3>
        {/* <ApexChart /> */}
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
        <ApexChart />
      </div>
    </div>
  );
}

export default RightComponent;

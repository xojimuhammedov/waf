import BottomComponent from './_components/BottomComponent';
import LeftComponent from './_components/LeftComponent';
import RightComponent from './_components/RightComponent';
import TopComponent from './_components/TopComponent';

const DashboardPage = () => {
  return (
    <div className="bg-[#131313] px-4 py-8 h-screen w-screen" style={{boxSizing: 'border-box'}}>
      <div className="flex justify-between h-full">
        <div className="w-1/3">
          <LeftComponent />
        </div>
        <div className="w-full flex flex-col">
          <div className={'h-full flex-shrink-1'}>
            <TopComponent />
          </div>
          <div className={'flex-shrink-0 h-[200px]'}>
            <BottomComponent />
          </div>

        </div>
        <div className="w-1/3">
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import DashboardLayout from 'components/Layouts/DashboardLayout';
import BottomComponent from './_components/BottomComponent';
import LeftComponent from './_components/LeftComponent';
import RightComponent from './_components/RightComponent';
import TopComponent from './_components/TopComponent';

const DashboardPage = () => {
  return (
    <div className="h-screen w-screen bg-[#131313] px-4 py-8" style={{ boxSizing: 'border-box' }}>
      <div className="flex h-full justify-between">
        <div className="w-1/4 dashboard-left px-6 pt-11">
          <LeftComponent />
        </div>
        <div className="flex w-full flex-col px-10">
          <div className={'flex-shrink-1 h-full'}>
            <TopComponent />
          </div>
          <div className={'h-[300px] flex-shrink-0'}>
            <BottomComponent />
          </div>
        </div>
        <div className="dashboard-right w-1/4 px-6 pt-11">
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

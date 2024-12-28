import DashboardLayout from 'components/Layouts/DashboardLayout';
import BottomComponent from './_components/BottomComponent';
import LeftComponent from './_components/LeftComponent';
import RightComponent from './_components/RightComponent';
import TopComponent from './_components/TopComponent';

const DashboardPage = () => {
  return (
    <div className="h-full w-full bg-[#131313]" style={{ boxSizing: 'border-box' }}>
      <div className="flex h-full justify-between">
        <div className="dashboard-left w-1/4 px-6 pt-11">
          <LeftComponent />
        </div>
        <div className="w-full relative">
          <div className={'h-full'}>
            <TopComponent />
          </div>
          <div
            style={{ borderTop: '1px solid #292929'}}
            className={'w-full h-[350px] flex-shrink-0 bg-[#00000077] bottom-0 absolute'}>
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

import DashboardLayout from 'components/Layouts/DashboardLayout';
import BottomComponent from './_components/BottomComponent';
import LeftComponent from './_components/LeftComponent';
import RightComponent from './_components/RightComponent';

const DashboardPage = () => {
  return (
    <div className="bg-[#131313]">
      <div className="flex justify-between">
        <div className="dashboard-left w-1/3 px-6 pt-11">
          <LeftComponent />
        </div>
        <div className="w-full px-6">
          <BottomComponent />
        </div>
        <div className="dashboard-right w-1/3 px-6 pt-11">
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

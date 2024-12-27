import BottomComponent from './_components/BottomComponent';
import LeftComponent from './_components/LeftComponent';
import RightComponent from './_components/RightComponent';

const DashboardPage = () => {
  return (
    <div className="bg-[#131313] py-8">
      <div className="flex justify-between">
        <div className="w-1/3 dashboard-left">
          <LeftComponent />
        </div>
        <div className="w-full px-6">
          <BottomComponent />
        </div>
        <div className="w-1/3 dashboard-right">
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

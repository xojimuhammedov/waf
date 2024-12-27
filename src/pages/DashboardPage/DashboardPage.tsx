import BottomComponent from './_components/BottomComponent';
import LeftComponent from './_components/LeftComponent';
import RightComponent from './_components/RightComponent';

const DashboardPage = () => {
  return (
    <div className="bg-[#131313] px-4 py-8">
      <div className="flex justify-between">
        <div className="w-1/3">
          <LeftComponent />
        </div>
        <div className="w-full">
          <BottomComponent />
        </div>
        <div className="w-1/3">
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

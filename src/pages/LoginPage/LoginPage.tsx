import LoginForm from './_components/LoginForm';
import WafIcon from 'assets/icons/WafIcon';
import LogoSvg from 'assets/icons/waf-logo.svg';

const LoginPage = () => {
  return (
    <div
      style={{ background: '#131313' }}
      className="flex h-screen items-center justify-center bg-gray-100 dark:bg-bg-darkBg">
      <div className="absolute w-[432px] transform p-8 dark:bg-bg-dark-bg">
        <div className="mb-6 flex items-center justify-center">
          {' '}
          <img src={LogoSvg} alt="" />
        </div>
        <div className="mb-8">
          {/* <p className="headers-web mb-2 text-center text-2xl text-white">
            Biz bilan xavfsizlikda bo'ling!
          </p> */}
          <p style={{ color: '#A3A3A3' }} className="text-center text-base">
            Biz bilan xavfsizlikda bo'ling!
          </p>
        </div>
        <LoginForm />
      </div>
      {/* <p className='absolute  text-black'>2019 - 2024 © Developed by  <span>Sector Secure LLC</span></p> */}
    </div>
  );
};

export default LoginPage;

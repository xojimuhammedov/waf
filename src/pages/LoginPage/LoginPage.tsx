import SecureStaff from 'assets/icons/SecureStaff';
import { useTranslation } from 'react-i18next';
import LoginForm from './_components/LoginForm';
import WafIcon from 'assets/icons/WafIcon';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{ background: '#131313' }}
      className="flex h-screen items-center justify-center bg-gray-100 dark:bg-bg-darkBg">
      <div className="absolute w-[432px] transform p-8 dark:bg-bg-dark-bg">
        <div className="flex mb-6 items-center justify-center">
          {' '}
          <WafIcon />
        </div>
        <div className="mb-8">
          <p className="headers-web mb-2 text-center text-2xl text-white">
            {t('WWAF ga xush kelibsiz')}
          </p>
          <p style={{ color: '#A3A3A3' }} className="text-center text-base">
            {t(`Dunyo bo'ylab real vaqt rejimidagi hujumlarni kuzatish.`)}
          </p>
        </div>
        <LoginForm />
      </div>
      {/* <p className='absolute  text-black'>2019 - 2024 © Developed by  <span>Sector Secure LLC</span></p> */}
    </div>
  );
};

export default LoginPage;

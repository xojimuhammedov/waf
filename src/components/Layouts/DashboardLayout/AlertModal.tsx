import MyButton from 'components/Atoms/MyButton/MyButton';
import MyModal from 'components/Atoms/MyModal';


function AlertModal({ onClose, show, handleLogOut }: any) {
  

  return (
    <>
      <MyModal
        modalProps={{ show: Boolean(show), onClose: onClose, size: 'md' }}
        headerProps={{
          children: '',
          className: ''
        }}
        bodyProps={{
          children: (
            <>
              <h2 className="text-center text-xl font-semibold">
                {'Are you sure you want to logout this profile?'}
              </h2>
              <div className="mb-[5px] mt-6 flex w-full justify-center gap-4">
                <MyButton onClick={handleLogOut} type="submit" variant="primary">
                  {' '}
                  {'Logout'}
                </MyButton>
                <MyButton className="w-[98px]" onClick={onClose} variant="secondary">
                  {' '}
                  {'Cancel'}
                </MyButton>
              </div>
            </>
          ),
          className: 'px-[20px]'
        }}
      />
    </>
  );
}

export default AlertModal;

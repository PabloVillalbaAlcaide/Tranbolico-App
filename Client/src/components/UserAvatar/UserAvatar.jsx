import './userAvatar.scss'

export const UserAvatar = ({ user, size = 50 }) => {

  let bgColor = '#91cad8 '

  if(user?.avatar === '/tram6.png' || user?.avatar === '/tram7.png'|| user?.avatar === '/tram8.png'|| user?.avatar === '/tram1.png'){
    bgColor= '#e3b6d4';
  }else{
    bgColor= '#b3b420';
  }

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgColor
  };
  return (
    <>
    <div style={avatarStyle}>
        {user?.avatar && <img
          src={`${import.meta.env.VITE_API_URL}/images/users/${user.avatar}`}
          alt="avatar"
          width={size}
          height={size}
          className='imagen-avatar'
        />}
        </div>
    </>
  );
};
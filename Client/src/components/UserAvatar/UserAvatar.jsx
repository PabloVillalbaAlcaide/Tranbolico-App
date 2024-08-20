import './userAvatar.scss'

export const UserAvatar = ({ user, size = 50 }) => {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#91cad8'
  };
  return (
    <>
    <div style={avatarStyle}>
        <img
          src={`http://localhost:4000/images/users/${user?.avatar}`}
          alt="avatar"
          width={size}
          height={size}
          className='imagen-avatar'
        />
        </div>
    </>
  );
};
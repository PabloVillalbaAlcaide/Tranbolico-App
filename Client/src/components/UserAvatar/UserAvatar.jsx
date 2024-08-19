import './userAvatar.scss'

export const UserAvatar = ({ user, size = 50 }) => {
  const bgColors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#FFB347', '#D5AAFF', '#9D9D9D'];
  const textColors = ['#FFFFFF', '#000000'];

  const getRandomColor = (colors) => colors[Math.floor(Math.random() * colors.length)];

  const getLetters = (name, surname) => `${name[0].toUpperCase()}${surname[0].toUpperCase()}`;

  const bgFinal = getRandomColor(bgColors);
  const textColorFinal = getRandomColor(textColors);

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgFinal,
    color: textColorFinal,
    fontSize: `${size / 2}px`,
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <>
      {user.avatar ? (
        <img 
          src={`http://localhost:4000/images/users/${user.avatar}`} 
          alt="avatar"
          width={size}
          height={size}
          className='imagen-avatar'
        />
      ) : (
        <div style={avatarStyle}>
          {getLetters(user.name, user.surname)}
        </div>
      )}
    </>
  );
};

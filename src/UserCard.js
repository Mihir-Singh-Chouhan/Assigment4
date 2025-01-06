import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  console.log('usersss', user);

  const onClickHandler = () => {
    // Navigate to UserDetails with username in the URL
    navigate(`/user-details/${user.login.username}`, { state: user });
  };

  return (
    <div className="user-card" key={user.email}>
      <img src={user.picture.medium} alt={user.name.first} />
      <div className="user-info">
        <h3>{user.name.first} {user.name.last}</h3>
        <p>{user.email}</p>
        <p className='view-detail' onClick={onClickHandler}>
          View Details 
        </p>
      </div>
    </div>
  );
};

export default UserCard;

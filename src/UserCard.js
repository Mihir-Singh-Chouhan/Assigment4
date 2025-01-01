// src/UserCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  console.log('usersss', user)

  const onClickHandler = () => {
    navigate('/user-details', { state: user});
  }

  return (
    <div className="user-card" key={user.email}>
      <img src={user.picture.medium} alt={user.name.first} />
      <div className="user-info">
        <h3>{user.name.first} {user.name.last}</h3>
        <p>{user.email}</p>
        {/* Link to the UserDetails page, passing the user data via state */}
        <p onClick={() => onClickHandler()}>
          View Details 
        </p>
        {/* <Link 
          to={{
            pathname: '/user-details',
          }}
          className="view-details-btn"
        >
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default UserCard;

// src/UserCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, UserDetailfull }) => {
  return (
    <div className="user-card" key={user.email}>
      <img src={user.picture.medium} alt={user.name.first} />
      <div className="user-info">
        <h3>{user.name.first} {user.name.last}</h3>
        <p>{user.email}</p>
        <button type='button' onClick={()=> UserDetailfull(user)} className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default UserCard;

// src/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';  // useParams allows us to get the userId from the URL
import './App.css';  // Import the CSS for styling

const UserDetails = ({user, UserDetailfull}) => {
  console.log(user, 'useruser')

  return (
    <div className="user-details">
      <h2>{user.name.first} {user.name.last}</h2>
      <img src={user.picture.large} alt={user.name.first} className="user-image" />
      
      {/* Display user details */}
       <div className="user-info">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Cell:</strong> {user.cell}</div>
        <div>
          <strong>Location:</strong> {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country} - {user.location.postcode}
        </div>
        <div><strong>Date of Birth:</strong> {new Date(user.dob.date).toLocaleDateString()}</div>
        <div><strong>Nationality:</strong> {user.nat}</div>
        <div><strong>Timezone:</strong> {user.location.timezone.description}</div>
        <div>
          <strong>Coordinates:</strong> {user.location.coordinates.latitude}, {user.location.coordinates.longitude}
        </div>
        <div><strong>Username:</strong> {user.login.username}</div>
      </div> 

      {/* Link to go back to the user list */}
      <button type="button" onClick={()=> UserDetailfull(null)} className="back-btn">Back to User List</button> 
    </div>
  );
};

export default UserDetails;

import React from 'react';
import { useLocation, Link } from 'react-router-dom';  // useLocation to access state passed through the router
import './App.css';  // Import the CSS for styling

const UserDetails = () => {
  // Use useLocation to access the user data passed from UserCard
  const location = useLocation();
  if (!location.state) {
    return <p>No user data available!</p>;
  }

  const user = location.state;

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
      <Link to="/home" className="back-btn">Back to User List</Link>
    </div>
  );
};

// Add export default to make this component available for import
export default UserDetails;

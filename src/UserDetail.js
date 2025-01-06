import React from 'react';
import { useLocation, Link } from 'react-router-dom';  
import './App.css';  

const UserDetails = () => {
  const location = useLocation();
  if (!location.state) {
    return <p>No user data available!</p>;
  }

  const user = location.state;
  const userLocation = user.location || {};
  const userName = user.name || {};

  const exportToCSV = () => {
    const userData = [
      ['First Name', 'Last Name', 'Email', 'Phone', 'Cell', 'Address', 'Date of Birth', 'Nationality', 'Timezone', 'Coordinates', 'Username'],
      [
        userName.first || 'N/A',
        userName.last || 'N/A',
        user.email || 'N/A',
        user.phone || 'N/A',
        user.cell || 'N/A',
        `${userLocation.street?.number || ''} ${userLocation.street?.name || ''}, ${userLocation.city || 'N/A'}, ${userLocation.state || 'N/A'}, ${userLocation.country || 'N/A'} - ${userLocation.postcode || 'N/A'}`,
        new Date(user.dob?.date).toLocaleDateString('en-US') || 'N/A',
        user.nat || 'N/A',
        userLocation.timezone?.description || 'N/A',
        `${userLocation.coordinates?.latitude || 'N/A'}, ${userLocation.coordinates?.longitude || 'N/A'}`,
        user.login?.username || 'N/A'
      ]
    ];

    const csvContent = userData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${userName.first || 'User'}_${userName.last || 'Details'}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="user-details">
      <h2>{userName.first || 'Unknown'} {userName.last || 'User'}</h2>
      <img src={user.picture?.large} alt={userName.first || 'User'} className="user-image" />
      
      <div className="user-info">
        <div><strong>Email:</strong> {user.email || 'N/A'}</div>
        <div><strong>Phone:</strong> {user.phone || 'N/A'}</div>
        <div><strong>Cell:</strong> {user.cell || 'N/A'}</div>
        <div>
          <strong>Location:</strong> {`${userLocation.street?.number || ''} ${userLocation.street?.name || ''}, ${userLocation.city || 'N/A'}, ${userLocation.state || 'N/A'}, ${userLocation.country || 'N/A'} - ${userLocation.postcode || 'N/A'}`}
        </div>
        <div><strong>Date of Birth:</strong> {new Date(user.dob?.date).toLocaleDateString('en-US') || 'N/A'}</div>
        <div><strong>Nationality:</strong> {user.nat || 'N/A'}</div>
        <div><strong>Timezone:</strong> {userLocation.timezone?.description || 'N/A'}</div>
        <div>
          <strong>Coordinates:</strong> {`${userLocation.coordinates?.latitude || 'N/A'}, ${userLocation.coordinates?.longitude || 'N/A'}`}
        </div>
        <div><strong>Username:</strong> {user.login?.username || 'N/A'}</div>
      </div> 

      <Link to="/home" className="back-btn">Back to User List</Link>
      <button onClick={exportToCSV} className="export-btn">Export to CSV</button>
    </div>
  );
};

export default UserDetails;

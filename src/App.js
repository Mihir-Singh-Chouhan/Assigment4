// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserDetails from './UserDetail';
import SearchFilter from './SearchFilter';
import UserCard from './UserCard';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [details, UserDetailfull] = useState(null);
  const usersPerPage = 48;

  // Fetch data from the API
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=200')
      .then(response => response.json())
      .then(data => {
        setData(data.results);
        setFilteredData(data.results); // Set initial filtered data as the full list
      });
  }, []);

  // Filter users based on search query and selected filters
  useEffect(() => {
    let filtered = data;

    // Search by name, email, or location
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${user.location.city} ${user.location.country}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by gender
    if (selectedGender) {
      filtered = filtered.filter(user => user.gender === selectedGender);
    }

    // Filter by age range
    if (selectedAgeRange) {
      const [minAge, maxAge] = selectedAgeRange.split('-').map(Number);
      filtered = filtered.filter(user => {
        const userAge = new Date().getFullYear() - new Date(user.dob.date).getFullYear();
        return userAge >= minAge && userAge <= maxAge;
      });
    }

    // Filter by nationality
    if (selectedNationality) {
      filtered = filtered.filter(user => user.nat === selectedNationality);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [searchQuery, selectedGender, selectedAgeRange, selectedNationality, data]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const currentUsers = filteredData.slice(indexOfLastUser - usersPerPage, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const pageNumbers = [];
  const maxPageRange = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (i <= 2 || i > totalPages - 2 || (i >= currentPage - maxPageRange && i <= currentPage + maxPageRange)) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...');
    }
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Random Users</h1>
          
          {/* Search and Filter Section */}
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedAgeRange={selectedAgeRange}
            setSelectedAgeRange={setSelectedAgeRange}
            selectedNationality={selectedNationality}
            setSelectedNationality={setSelectedNationality}
          />
          
          {filteredData.length > 0 ? (
            <>
              <div className="user-grid">
                {currentUsers.map(user => (
                  <UserCard UserDetailfull={UserDetailfull}  key={user.email} user={user} />
                ))}
              </div>
              <div className="pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
                {pageNumbers.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => number !== '...' && setCurrentPage(number)}
                    className={currentPage === number ? 'active' : ''}
                    disabled={number === '...'}
                  >
                    {number}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </header>
        {details?.cell &&
         <UserDetails UserDetailfull={UserDetailfull} user={details} />
        }
      </div>
    </Router>
  );
}

export default App;

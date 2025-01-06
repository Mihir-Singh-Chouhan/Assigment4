// src/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import SearchFilter from './SearchFilter';

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order: ascending
  const [error, setError] = useState(null); // State to hold error messages
  const usersPerPage = 12;
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=200');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.results);
        setFilteredData(result.results); // Set initial filtered data as the full list
      } catch (error) {
        setError(error.message); // Set the error message
      }
    };

    fetchData();
  }, []);

  // Filter users based on search query and selected filters
  useEffect(() => {
    let filtered = data;

    // Search by name, email, or location
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name?.first?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name?.last?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${user.location?.city} ${user.location?.country}`.toLowerCase().includes(searchQuery.toLowerCase())
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
        const userAge = new Date().getFullYear() - new Date(user.dob?.date).getFullYear();
        return userAge >= minAge && userAge <= maxAge;
      });
    }

    // Filter by nationality
    if (selectedNationality) {
      filtered = filtered.filter(user => user.nat === selectedNationality);
    }

    // Sorting logic
// Sorting logic
if (sortBy === 'name') {
  filtered = filtered.sort((personA, personB) => {
    const fullNameA = `${personA.name?.first} ${personA.name?.last}`.toLowerCase();
    const fullNameB = `${personB.name?.first} ${personB.name?.last}`.toLowerCase();
    return sortOrder === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
  });
} else if (sortBy === 'age') {
  filtered = filtered.sort((personA, personB) => {
    const currentYear = new Date().getFullYear();
    const ageA = currentYear - new Date(personA.dob?.date).getFullYear();
    const ageB = currentYear - new Date(personB.dob?.date).getFullYear();
    return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
  });
}

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page whenever filters or sorting change
  }, [searchQuery, selectedGender, selectedAgeRange, selectedNationality, sortBy, sortOrder, data]);

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

  // Function to handle clicking on More Info
  const handleMoreInfo = (user) => {
    navigate(`/user-details`,{state:{user}});
  };

  return (
    <div className="Home">
      {error && <div className="error">Error: {error}</div>} {/* Display error message if exists */}
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

      {/* Sort Options UI */}
      <div className="sort-options">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="name">Sort by Name</option>
          <option value="age">Sort by Age</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        <>
          <div className="user-grid">
            {currentUsers.map(user => (
              <UserCard key={user.email} user={user} handleMoreInfo={handleMoreInfo} />
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
    </div>
  );
}
export default Home;

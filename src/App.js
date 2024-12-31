import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 48;

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5000')
      .then(response => response.json())
      .then(data => setData(data.results));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const currentUsers = data.slice(indexOfLastUser - usersPerPage, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);

 
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
    <div className="App">
      <header className="App-header">
        <h1>Random Users</h1>
        {data.length > 0 ? (
          <>
            <div className="user-grid">
              {currentUsers.map(user => (
                <div className="user-card" key={user.email}>
                  <img src={user.picture.medium} alt={user.name.first} />
                  <div className="user-info">
                    <h3>{user.name.first} {user.name.last}</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
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
    </div>
  );
}

export default App;

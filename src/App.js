import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 50;

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5000')
      .then(response => response.json())
      .then(data => setData(data.results));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const currentUsers = data.slice(indexOfLastUser - usersPerPage, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Users</h1>
        {data.length > 0 ? (
          <>
            <ul>
              {currentUsers.map(user => (
                <li key={user.email}>
                  <img src={user.picture.medium} alt={user.name.first} />
                  <div>{user.name.first} {user.name.last}</div>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
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

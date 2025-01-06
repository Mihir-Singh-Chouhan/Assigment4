// src/SearchFilter.js
import React from 'react';

const SearchFilter = ({ searchQuery, setSearchQuery, selectedGender, setSelectedGender, selectedAgeRange, setSelectedAgeRange, selectedNationality, setSelectedNationality }) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search by name, email, or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select value={selectedAgeRange} onChange={(e) => setSelectedAgeRange(e.target.value)}>
        <option value="">All Ages</option>
        <option value="18-30">18-30</option>
        <option value="31-45">31-45</option>
        <option value="46-60">46-60</option>
        <option value="61+">61+</option>
      </select>
      <select value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)}>
        <option value="">All Nationalities</option>
        <option value="US">US</option>
        <option value="GB">GB</option>
        <option value="IN">IN</option>
        <option value="CA">CA</option>
        {/* Add more nationality options as needed */}
      </select>
    </div>
  );
};

export default SearchFilter;

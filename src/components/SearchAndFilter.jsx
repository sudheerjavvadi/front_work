// src/components/SearchAndFilter.jsx
import React from 'react';

const SearchAndFilter = () => {
  return (
    <div className="filter-bar">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search for workshops..." 
          className="search-input" 
        />
      </div>
      
      {/* Dropdown 1 */}
      <div className="dropdown-wrapper">
        <select className="dropdown-select">
          <option value="">Category</option>
          <option value="tech">Technology</option>
          <option value="art">Arts</option>
          <option value="mkt">Marketing</option>
        </select>
      </div>

      {/* Dropdown 2 */}
      <div className="dropdown-wrapper">
        <select className="dropdown-select">
          <option value="">Audience</option>
          <option value="pro">Professionals</option>
          <option value="beg">Beginners</option>
          <option value="stu">Students</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
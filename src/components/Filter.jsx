import React from 'react';

const Filter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Filter by Category:</label>
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default Filter;

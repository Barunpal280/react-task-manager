import React, {useState} from "react";

const FilterBar = ({ searchQuery, priorityFilter, onSearchChange, onPriorityChange }) => {
  const handleClearFilters = (e) => {
    e.preventDefault();
    onSearchChange("");
    onPriorityChange("all");
  }

  return (
            <div className="filter-bar">
                <div>
                    <label htmlFor="priority-filter">Filter by Priority:</label>
                    <select id="priority-filter" value={priorityFilter} onChange={(e) => onPriorityChange(e.target.value)}>

                        <option value="all">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <input type="text" id="search-box" placeholder="Search tasks..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}/>
                    <a href="#" id="clear-filters" onClick={handleClearFilters}>Clear Filters</a>
                </div>
            </div>     
  );
};

export default FilterBar;   
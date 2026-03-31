import React from "react";
import { useTaskContext } from "../context/TaskContext";

const FilterBar = () => {
  const { searchQuery, setSearchQuery, priorityFilter, setPriorityFilter } = useTaskContext();
  
  const handleClearFilters = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setPriorityFilter("all");
  }

  return (
            <div className="filter-bar">
                <div>
                    <label htmlFor="priority-filter">Filter by Priority:</label>
                    <select id="priority-filter" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>

                        <option value="all">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <input type="text" id="search-box" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <a href="#" id="clear-filters" onClick={handleClearFilters}>Clear Filters</a>
                </div>
            </div>     
  );
};

export default FilterBar;   
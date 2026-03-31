import React, { createContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const LOCAL_STORAGE_KEY = "taskManagerTasks";
  
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) {
        return { todo: [], inprogress: [], done: [] };
      }
      const parsed = JSON.parse(stored);
      if (!parsed || typeof parsed !== "object") {
        return { todo: [], inprogress: [], done: [] };
      }
      return {
        todo: Array.isArray(parsed.todo) ? parsed.todo : [],
        inprogress: Array.isArray(parsed.inprogress) ? parsed.inprogress : [],
        done: Array.isArray(parsed.done) ? parsed.done : []
      };
    } catch (err) {
      console.warn("Could not parse stored tasks from localStorage", err);
      return { todo: [], inprogress: [], done: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  return (
    <TaskContext.Provider value={{ tasks, setTasks, searchQuery, setSearchQuery, priorityFilter, setPriorityFilter }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};
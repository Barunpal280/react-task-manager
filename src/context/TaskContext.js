import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();
const LOCAL_STORAGE_KEY = 'taskManagerTasks';

const initialTasks = {
  todo: [],
  inprogress: [],
  done: []
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const { column, task } = action.payload;
      return {
        ...state,
        [column]: [...state[column], task]
      };
    }

    case 'MOVE_TASK': {
      const { taskId, fromColumn, direction } = action.payload;
      const toColumn =
        direction === 'next'? fromColumn === 'todo'? 'inprogress': 'done': fromColumn === 'done'? 'inprogress': 'todo';

      const taskToMove = state[fromColumn].find((task) => task.id === taskId);
      if (!taskToMove) return state;

      return {
        ...state,
        [fromColumn]: state[fromColumn].filter((task) => task.id !== taskId),
        [toColumn]: [...state[toColumn], taskToMove]
      };
    }

    case 'DELETE_TASK': {
      const { taskId, column } = action.payload;
      return {
        ...state,
        [column]: state[column].filter((task) => task.id !== taskId)
      };
    }

    case 'SET_TASKS':
      return action.payload;

    default:
      return state;
  }
}

function initTasks() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return initialTasks;

    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') return initialTasks;

    return {
      todo: Array.isArray(parsed.todo) ? parsed.todo : [],
      inprogress: Array.isArray(parsed.inprogress) ? parsed.inprogress : [],
      done: Array.isArray(parsed.done) ? parsed.done : []
    };
  } catch (err) {
    console.warn('Could not parse stored tasks from localStorage', err);
    return initialTasks;
  }
}

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks, initTasks);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dispatch,
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};
import React, {useState, useEffect} from "react";
import Column from "./Column";
import FilterBar from "./FilterBar";
import SummaryBar from "./SummaryBar";

const LOCAL_STORAGE_KEY = "taskManagerTasks";

const Columns = (props) => {
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
    <div className="dashboard">
        <FilterBar
        searchQuery={searchQuery}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchQuery} 
        onPriorityChange={setPriorityFilter}
        />

        <SummaryBar tasks={tasks} />

         <div className="columns">
            <Column column="todo" title="To Do" 
              tasks={tasks.todo} 
              setTasks={setTasks}
              searchQuery={searchQuery} 
              priorityFilter={priorityFilter}
            />
            <Column column="inprogress" title="In Progress" 
              tasks={tasks.inprogress} 
              setTasks={setTasks}
              searchQuery={searchQuery} 
              priorityFilter={priorityFilter}
            />
            <Column column="done" title="Done" 
              tasks={tasks.done} 
              setTasks={setTasks}
              searchQuery={searchQuery} 
              priorityFilter={priorityFilter}
            />
        </div>     
    </div>                   
  );
};

export default Columns;
import React from "react";
import { useTaskContext } from "../context/TaskContext";
import Column from "./Column";
import FilterBar from "./FilterBar";
import SummaryBar from "./SummaryBar";

const Columns = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="dashboard">
        <FilterBar />

        <SummaryBar tasks={tasks} />

         <div className="columns">
            <Column column="todo" title="To Do" />
            <Column column="inprogress" title="In Progress" />
            <Column column="done" title="Done" />
        </div>     
    </div>                   
  );
};

export default Columns;
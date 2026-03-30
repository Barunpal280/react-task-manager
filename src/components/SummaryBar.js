import React from "react";

const SummaryBar = ({ tasks }) => {
    const totalTasks = tasks.todo.length + tasks.inprogress.length + tasks.done.length;
    const todoCount = tasks.todo.length;
    const inProgressCount = tasks.inprogress.length;
    const doneCount = tasks.done.length;         
    return (
        <div class="summary-bar">
            <div>To Do: <span id="todo-count">{todoCount}</span></div>
            <div>In Progress: <span id="inprogress-count">{inProgressCount}</span></div>
            <div>Done: <span id="done-count">{doneCount}</span></div>
        </div>
    );
};

export default SummaryBar;
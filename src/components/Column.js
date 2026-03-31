import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const Column = ({ title, column }) => {
  const { tasks, setTasks, searchQuery, priorityFilter } = useTaskContext(); 
    
    // Logic: Filter the tasks array based on the props received from Parent
    const displayedTasks = tasks[column].filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
        
        return matchesSearch && matchesPriority;
    });

    // This state is UNIQUE to every individual column instance
    const [isFormOpen, setIsFormOpen] = useState(false);

    // This state is for showing warning and UNIQUE to every individual column instance
    const [hasWarning, setHasWarning] = useState(false);

    // This state is for the priority dropdown
    const [priority, setPriority] = useState("");

    // This state is for the priority dropdown
    const [taskTitle, setTaskTitle] = useState("");

    // This state is for the priority dropdown
    const [taskDueDate, setTaskDueDate] = useState("");

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const addTaskBtnClick = () => { 
        toggleForm();
        setHasWarning("");
    }

    const handleAddTask = (newTask) => {
        setTasks(prevTasks => ({
            ...prevTasks, // Copy all existing columns (inprogress, done)   
            [column]: [...prevTasks[column], newTask] // Update the current column's array
        }));
    };

    const submitTask = () => {
        if (taskTitle.trim() === "" || priority === "") {            
            setHasWarning("Please enter a task title and select a priority.");
            return;
        }else{
            // Here we would normally handle the task submission logic.
           const newTask = {
                id: Date.now(), // Unique ID for React "keys"
                title: taskTitle,
                priority: priority,
                dueDate: taskDueDate
            };

            handleAddTask(newTask);

            

            // Reset form fields and close the form
            setTaskTitle("");
            setPriority("");
            setTaskDueDate("");
            toggleForm();

        }
    }

    const onMoveTask = (taskId, fromColumn, direction) => {
        const toColumn = direction === "next" ? (fromColumn === "todo" ? "inprogress" : "done") : (fromColumn === "done" ? "inprogress" : "todo");
        setTasks(prevTasks => {
            const taskToMove = prevTasks[fromColumn].find(t => t.id === taskId);
            if (!taskToMove) return prevTasks;

            return {
                ...prevTasks,
                [fromColumn]: prevTasks[fromColumn].filter(t => t.id !== taskId),
                [toColumn]: [...prevTasks[toColumn], taskToMove]
            };
        });
    }
         


  return (
    <div className="column" data-column={column}>
        <h2>{title}</h2>
        <button className="add-task-btn" onClick={addTaskBtnClick}>Add Task</button>
        {isFormOpen && (
            <div className="task-form">
                <input type="text" placeholder="Task Title" className="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                <select className="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="" disabled defaultValue>
                        Select Priority
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="date" className="task-due-date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)}   />
                {hasWarning && <div className="warning">{hasWarning}</div>}
                <button className="submit-task" onClick={submitTask}>Add Task</button>
            </div>
        )}
        <div className="tasks">
            {displayedTasks.map((task) => (
                <div key={task.id} className="task-card">
                    <div className="shift-buttons">
                        <button
                            disabled={column === "todo"}
                            onClick={() => onMoveTask(task.id, column, "prev")}
                        >◀</button>

                        <button
                            disabled={column === "done"}
                            onClick={() => onMoveTask(task.id, column, "next")}
                        >▶</button>
                    </div>

                    <h4 className="task-title">{task.title}</h4>
                    { column !== "done" && (
                        <>
                            <span className={`task-priority priority-${(task.priority || "").toLowerCase()}`}>
                                {(task.priority || "").slice(0, 1).toUpperCase() + (task.priority || "").slice(1)}
                            </span>
                            <p className="task-due-date" style={{ marginTop: '5px' }}>Due Date: {task.dueDate || "N/A"}</p>
                        </>
                    )}
                    <span className="delete-task" onClick={() => setTasks(prevTasks => ({
                        ...prevTasks,
                        [column]: prevTasks[column].filter(t => t.id !== task.id)
                    }))}>X</span>
                </div>
            ))}
        </div>
    </div> 
  );
};

export default Column;
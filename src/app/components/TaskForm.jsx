"use client";
import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    await addTask(taskTitle); 
    setTaskTitle(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-grow p-2 border rounded text-black"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

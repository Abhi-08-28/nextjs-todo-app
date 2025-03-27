"use client";

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);


  const addTask = async (taskTitle) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]); 
  };

  
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id)); 
  };

  const updateTask = async(id, completed) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if(res.ok){
      setTasks(
        tasks.map((task) => 
        task._id === id? { ...task, completed} : task)
      );
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded">
      <h1 className="text-xl font-bold mb-4 text-black text-center">To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </main>
  );
}

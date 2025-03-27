"use client";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  return (
    <ul className="space-y-2">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <li
            key={task._id}
            className={`flex justify-between items-center p-2 rounded ${
              task.completed ? "bg-green-200" : "bg-gray-100"
            } text-black`}
          >
            <span className={task.completed ? "line-through" : ""}>
              {task.title}
            </span>

            <div className="flex gap-2">
              {}
              <button
                onClick={() => updateTask(task._id, !task.completed)}
                className={`px-3 py-1 rounded ${
                  task.completed ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
                } text-white`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              {}
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;

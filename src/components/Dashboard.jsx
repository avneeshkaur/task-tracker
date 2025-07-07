import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { loadTasks, saveTasks } from "../utils/localStorage";
import TaskItem from "./TaskItem";

export default function Dashboard({ username, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTasks(loadTasks(username));
  }, [username]);

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    saveTasks(username, newTasks);
  };

  const handleAddTask = (taskData) => {
    updateTasks([...tasks, taskData]);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    updateTasks(tasks.map(task => task.id === taskData.id ? taskData : task));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      updateTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleToggleComplete = (taskId) => {
    updateTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter(task => {
      if (priorityFilter === "all") return true;
      return task.priority === priorityFilter;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen`}>
      <header className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Tracker</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-sm underline">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <span>Welcome, {username}!</span>
            <button onClick={onLogout} className="text-blue-600 hover:text-blue-800">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search tasks..."
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">My Tasks</h2>
          <button
            onClick={() => setShowTaskForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["all", "pending", "completed"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}

          {["all", "Low", "Medium", "High"].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-4 py-2 rounded-lg transition ${
                priorityFilter === p
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Priority: {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Stat label="Total" count={tasks.length} color="blue" />
          <Stat label="Pending" count={tasks.filter(t => !t.completed).length} color="yellow" />
          <Stat label="Completed" count={tasks.filter(t => t.completed).length} color="green" />
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))}

          {filteredTasks.length === 0 && <div className="text-gray-500 text-center py-4">No tasks found.</div>}
        </div>
      </main>

      {showTaskForm && (
        <TaskForm onSave={handleAddTask} onCancel={() => setShowTaskForm(false)} isEdit={false} />
      )}
      {editingTask && (
        <TaskForm task={editingTask} onSave={handleUpdateTask} onCancel={() => setEditingTask(null)} isEdit={true} />
      )}
    </div>
  );
}

function Stat({ label, count, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    green: "text-green-600 bg-green-50",
  };
  return (
    <div className={`rounded-xl p-4 shadow-sm hover:scale-105 transition ${colors[color]}`}>
      <p className="text-3xl font-bold">{count}</p>
      <p className="mt-2">{label}</p>
    </div>
  );
}

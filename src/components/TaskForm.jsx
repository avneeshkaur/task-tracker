import { useEffect, useState } from "react";

export default function TaskForm({ task, onSave, onCancel, isEdit = false }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "Medium");
      setDueDate(task.dueDate || "");
      setTags(task.tags ? task.tags.join(", ") : "");
    }
  }, [isEdit, task]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const taskData = {
      id: isEdit ? task.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
      completed: isEdit ? task.completed : false,
      createdAt: isEdit ? task.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(taskData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-full max-w-md space-y-5 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEdit ? "Edit Task" : "Add Task"}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">
            ✖
          </button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter task title"
              className="w-full p-2 border rounded text-gray-900 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task (optional)"
              className="w-full p-2 border rounded text-gray-900 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded text-gray-900 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border rounded text-gray-900 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. work, personal"
              className="w-full p-2 border rounded text-gray-900 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

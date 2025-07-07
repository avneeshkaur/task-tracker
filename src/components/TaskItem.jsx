export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h4 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-black"}`}>
              {task.title}
            </h4>
            <p className="text-sm text-gray-700">{task.description}</p>
  
            <div className="text-xs text-gray-500 mt-2">
              <p>Created At: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A"}</p>
              <p>Updated At: {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "N/A"}</p>
              <p>Due: {task.dueDate || "N/A"}</p>
              <p>Priority: <span className="ml-1 font-medium">{task.priority || "None"}</span></p>
              <p>Tags: {task.tags?.join(", ") || "None"}</p>
            </div>
          </div>
  
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              title="Mark Complete"
            />
            <button onClick={() => onEdit(task)} className="text-blue-600 hover:text-blue-800">Edit</button>
            <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800">Delete</button>
          </div>
        </div>
      </div>
    );
  }
  
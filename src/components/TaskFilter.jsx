// src/components/TaskFilter.jsx

export default function TaskFilter({ filter, setFilter, totalTasks, pendingTasks, completedTasks }) {
    const filters = [
      { label: "All", value: "all", count: totalTasks },
      { label: "Pending", value: "pending", count: pendingTasks },
      { label: "Completed", value: "completed", count: completedTasks },
    ];
  
    return (
      <div className="flex gap-3 flex-wrap mb-6">
        {filters.map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === value ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    );
  }
  
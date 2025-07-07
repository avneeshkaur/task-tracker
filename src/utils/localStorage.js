// src/utils/localStorage.js

export const saveTasks = (username, tasks) => {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  };
  
  export const loadTasks = (username) => {
    const saved = localStorage.getItem(`tasks_${username}`);
    return saved ? JSON.parse(saved) : [];
  };
  
  export const clearTasks = (username) => {
    localStorage.removeItem(`tasks_${username}`);
  };
  
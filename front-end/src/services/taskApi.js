import api from "../utils/api";

const getTasks = async () => {
  console.log();
  return await api.get("/tasks/");
};

const updateTask = async (taskId, task) => {
  return await api.put(`/tasks/${taskId}`, task);
};

const createTask = async (task) => {
  return await api.post(`/tasks/`, task);
};

const deleteTask = async (taskId) => {
  return await api.delete(`/tasks/${taskId}`);
};

export { getTasks, updateTask, createTask, deleteTask };

const taskApi = (api) => {
  const getTasks = async () => {
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

  return {
    getTasks,
    updateTask,
    createTask,
    deleteTask
  }
}

export default taskApi;

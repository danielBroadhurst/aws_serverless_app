import axios from 'axios';

const getTasks = async () => {
  return await axios({
    method: 'GET',
    url: "http://localhost:3000/tasks/"
  })
}

const updateTask = async (taskId, task) => {
  return await axios({
    method: 'PUT',
    url: `http://localhost:3000/tasks/${taskId}`,
    data: task
  })
}

const createTask = async (task) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/tasks/`,
    data: task
  })
}

const deleteTask = async (taskId) => {
  console.log("delete" + taskId);
  return await axios({
    method: 'DELETE',
    url: `http://localhost:3000/tasks/${taskId}`,
  })
}

export {
  getTasks,
  updateTask,
  createTask,
  deleteTask
}
const { tasks } = require("../models");

const createTask = async (req, res, next) => {
  let response;
  try {
    const { taskId, userId, description, completed } = req.body;
    response = await tasks.createTask({ taskId, userId, description, completed });
  } catch (error) {
    console.log(error);
    return next(error, null);
  }
  res.status(201).json(response);
}

const updateTask = async (req, res, next) => {
  let response;
  try {
    const task = req.body;
    const {taskId} = req.params;
    response = await tasks.updateTask(taskId, task);
  } catch (error) {
    console.log(error);
    return next(error, null);
  }
  res.status(204).json();
}


const deleteTask = async (req, res, next) => {
  let response;
  try {
    const { taskId } = req.params;
    response = await tasks.deleteTask(taskId);
  } catch (error) {
    console.log(error);
    return next(error, null);
  }
  res.status(204).json();
}

const getUsersTasks = async (req, res, next) => {
  const { userId } = req.params;
  let response;
  try {
    response = await tasks.getTasksByUser(userId);
  } catch (error) {
    console.log(error);
    return next(error, null);
  }
  res.json({ response });
};

const getAllTasks = async (req, res, next) => {
  let response;
  try {
    response = await tasks.getAll();
  } catch (error) {
    console.log(error);
    return next(error, null);
  }
  res.json({ response });
};

const getTask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    request = await tasks.getById(taskId);
  } catch (error) {
    console.log(error);
    return next(error, null);
  }
  res.json({ request });
};

module.exports = {
  getAllTasks,
  getUsersTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask
};

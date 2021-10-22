const AWS = require("aws-sdk");
const utils = require("../utils");

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "eu-west-2",
  endpoint: "http://localhost:8000",
});

const createTask = async (task) => {
  var params = {
    Item: {
      pk: "task",
      taskId: task.taskId,
      userId: task.userId,
      task: task.description,
      completed: task.completed,
      createdAt: new Date().toISOString(),
    },
    TableName: "tasks",
    ReturnValues: "ALL_OLD",
  };
  return dynamodb.put(params).promise();
};

const updateTask = async (taskId, task) => {
  const checkTaskExists = await getById(taskId);
  if (!checkTaskExists) {
    throw new Error(`TaskID: '${taskId}' not found.`)
  }

  const updatedTask = {
    ...checkTaskExists,
    ...task
  }

  var params = {
    Item: {
      pk: "task",
      ...updatedTask,
      updatedAt: new Date().toISOString(),
    },
    TableName: "tasks",
  };
  return dynamodb.put(params).promise();
};

const deleteTask = async (taskId) => {
  var params = {
    Key: {
      pk: "task",
      taskId: taskId,
    },
    TableName: "tasks",
  };
  return dynamodb.delete(params).promise();
};

const getAll = async () => {
  // Query
  const params = {
    TableName: "tasks",
    Select: "ALL_ATTRIBUTES",
  };
  let tasks = await dynamodb.scan(params).promise();
  tasks = tasks.Items ? tasks.Items.map(convertToPublicFormat) : null;

  return tasks;
};

const getById = async (taskId) => {
  // Validate
  if (taskId === undefined) {
    throw new Error(`"taskId" is required`);
  }

  // Query
  const params = {
    TableName: "tasks",
    ScanIndexForward: true,
    ConsistentRead: false,
    KeyConditionExpression: "#pk = :pk And #taskId = :taskId",
    ExpressionAttributeValues: {
      ":pk": "task",
      ":taskId": taskId,
    },
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#taskId": "taskId",
    },
  };
  let task = await dynamodb.query(params).promise();
  task = task.Items && task.Items[0] ? convertToPublicFormat(task.Items[0]) : null;

  return task;
};

const getTasksByUser = async (userId) => {
  console.log(userId);
  // Validate
  if (userId === undefined) {
    throw new Error(`"userId" is required`);
  }

  // Query
  const params = {
    TableName: "tasks",
    ScanIndexForward: true,
    ConsistentRead: false,
    FilterExpression: "#DYNOBASE_userId = :userId",
    ExpressionAttributeNames: {
      "#DYNOBASE_userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": "ce4fd402-2122-4580-9f15-993b17baedd6",
    },
  };

  let task = await dynamodb.scan(params).promise();
  task = task.Items ? task.Items.map(convertToPublicFormat) : null;

  return task;
};

/**
 * Convert task record to public format
 * This hides the keys used for the dynamodb's single table design and returns human-readable properties.
 * @param {*} task
 */
const convertToPublicFormat = (task = {}) => {
  task.task = task.task || null;
  if (task.pk) delete task.pk;
  return task;
};

module.exports = {
  getById,
  getAll,
  createTask,
  deleteTask,
  getTasksByUser,
  updateTask,
  convertToPublicFormat,
};

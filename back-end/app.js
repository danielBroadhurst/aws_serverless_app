const serverless = require('serverless-http');
const express = require('express')
const app = express()
const {
  users
} = require('./controllers');
const { tasks } = require('./controllers');

/**
 * Configure Express.js Middleware
 */

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(express.urlencoded({ extended: true }));
// Enable JSON use
app.use(express.json());

// Since Express doesn't support error handling of promises out of the box,
// this handler enables that
const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next);
};

/**
 * Routes - Public
 */

app.options(`*`, (req, res) => {
  res.status(200).send()
})

app.get(`/users/:userId/tasks/`, asyncHandler(tasks.getUsersTasks))

app.get(`/tasks/`, asyncHandler(tasks.getAllTasks))
app.post(`/tasks/`, asyncHandler(tasks.createTask))
app.get(`/tasks/:taskId`, asyncHandler(tasks.getTask))
app.put(`/tasks/:taskId`, asyncHandler(tasks.updateTask))
app.delete(`/tasks/:taskId`, asyncHandler(tasks.deleteTask))


app.get(`/test/`, (req, res) => {
  res.status(200).send({test:`Listening on: 3000`})
})

/**
 * Routes - Catch-All
 */

app.get(`/*`, (req, res) => {
  res.status(404).send({test:`catch-all`})
})

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).json({ error: `Internal Serverless Error - "${err.message}"` })
})

app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);

module.exports = app
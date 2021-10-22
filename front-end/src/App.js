// import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";

import { createTask, getTasks, updateTask, deleteTask } from "./services/taskApi";
import { useEffect, useState } from "react";
import { generateUuid } from "./utils/";

function App() {
  const [tasks, setTasks] = useState([]);

  async function loadData() {
    return await getTasks();
  }

  useEffect(() => {
    loadData().then((resp) => setTasks(resp.data.response));
  }, []);

  async function handleCompleted(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.taskId === taskId) {
          let updatedTask = {
            ...task,
            completed: !task.completed,
          };
          updateTask(taskId, updatedTask);
          return updatedTask;
        } else {
          return task;
        }
      })
    );
  }

  function handleUpdate(taskId, value) {
    setTasks(
      tasks.map((task) => {
        if (task.taskId === taskId) {
          let updatedTask = {
            ...task,
            task: value,
          };
          updateTask(taskId, updatedTask);
          return updatedTask;
        } else {
          return task;
        }
      })
    );
  }

  async function createNewTask() {
    const newTask = {
      taskId: generateUuid(),
      userId: "ce4fd402-2122-4580-9f15-993b17baedd6",
      task: "",
      completed: false,
    };
    await createTask(newTask);
    setTasks([...tasks, newTask]);
  }

  function removeTask(taskId) {
    setTasks(
      tasks.filter((task) => {
        if (task.taskId === taskId) {
          deleteTask(taskId)
          return false;
        } else {
          return true;
        }
      })
    );
  }

  return (
    <div className="App">
      <h1>ToDo App</h1>
      {tasks.length > 0 &&
        tasks.map((task, i) => {
          return (
            <div className="input-box" key={i} id={task.taskId}>
              <input
                type="text"
                onChange={(evt) => handleUpdate(task.taskId, evt.target.value)}
                value={task.task ?? ''}
              ></input>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleted(task.taskId)}
              ></input>
              <button onClick={() => removeTask(task.taskId)}>X</button>
            </div>
          );
        })}
      <button onClick={() => createNewTask()}>Add New Task</button>
    </div>
  );
}

// export default withAuthenticator(App);
export default App;

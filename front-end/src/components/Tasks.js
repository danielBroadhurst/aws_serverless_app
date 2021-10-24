import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks } from "../services/taskApi";
import { generateUuid } from "../utils/uuid";
import Task from "./Task";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  async function loadData() {
    return await getTasks();
  }

  useEffect(() => {
    loadData().then((resp) => setTasks(resp.data.response));
  }, []);

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
          deleteTask(taskId);
          return false;
        } else {
          return true;
        }
      })
    );
  }
  return (
    <div>
      {tasks.length > 0 &&
        tasks.map((task, i) => {
          return <Task key={i} taskObj={task} deleteTask={removeTask}></Task>;
        })}
      <button onClick={() => createNewTask()}>Add New Task</button>
    </div>
  );
};

export default Tasks;

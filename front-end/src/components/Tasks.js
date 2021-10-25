import { useEffect, useState } from "react";
import { generateUuid } from "../utils/uuid";
import Task from "./Task";

const Tasks = ({ taskClient, user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let mounted = true;
    taskClient.getTasks().then((response) => {
      if (mounted) {
        setTasks(response.data.response);
      }
    });
    return () => (mounted = false);
  }, [taskClient]);

  async function createNewTask() {
    const newTask = {
      taskId: generateUuid(),
      userId: user.username,
      task: "",
      completed: false,
    };
    await taskClient.createTask(newTask);
    setTasks([...tasks, newTask]);
  }

  function removeTask(taskId) {
    setTasks(
      tasks.filter((task) => {
        if (task.taskId === taskId) {
          taskClient.deleteTask(taskId);
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
        tasks.map((task) => {
          return (
            <Task
              key={task.taskId}
              taskObj={task}
              deleteTask={removeTask}
              updateTask={taskClient.updateTask}
            ></Task>
          );
        })}
      <button className="button" onClick={() => createNewTask()}>Add New Task</button>
    </div>
  );
};

export default Tasks;

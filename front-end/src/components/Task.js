import { useEffect, useState } from "react";
import { updateTask } from "../services/taskApi";

function Task({ key, taskObj, deleteTask }) {
  const [task, setTask] = useState(taskObj);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateTask(task.taskId, task)
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [task, task.task]);

  function handleUpdate(value) {
    setTask({
      ...task,
      task: value,
    });
  }

  function handleCompleted() {
    setTask({
      ...task,
      completed: !task.completed,
    });
  }

  return (
    <div className="input-box" key={key} id={task.taskId}>
      <input
        type="text"
        onChange={(evt) => handleUpdate(evt.target.value)}
        value={task.task ?? ""}
      ></input>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleCompleted(task.taskId)}
      ></input>
      <button onClick={() => deleteTask(task.taskId)}>X</button>
    </div>
  );
}

export default Task;

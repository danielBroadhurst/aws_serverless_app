import { useEffect, useState } from "react";

function Task({ taskObj, deleteTask, updateTask }) {
  const [task, setTask] = useState(taskObj);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateTask(task.taskId, task)
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [task, task.task, updateTask]);

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
    <div className="input-box" id={task.taskId}>
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
      <button className="button" onClick={() => deleteTask(task.taskId)}>X</button>
    </div>
  );
}

export default Task;

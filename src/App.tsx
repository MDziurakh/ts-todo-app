import React, { FC, FormEvent, useState } from "react";
import TodoTask from "./components/TodoTask";
import { MassageSVGs, PersonSVG } from "./svg/EmojiSVGs";
import { MdAddTask } from "react-icons/md";

interface ITask {
  title: string;
  id: number;
  completed: boolean;
}

const App: FC = () => {
  const [taskValue, setTaskValue] = useState<string>("");

  const [tasks, setTasks] = useState<ITask[]>([]);
  const notCompletedTasks = tasks.filter((task) => !task.completed);

  const submitHandler = (e: FormEvent<Element>): void => {
    e.preventDefault();
    if (taskValue.length === 0) return;
    const currentTask: ITask = {
      id: Math.random(),
      title: taskValue,
      completed: false,
    };
    setTasks([...tasks, currentTask]);
    setTaskValue("");
  };

  const removeTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const onComplete = (id: number): void => {
    const findTask = tasks.find((task) => task.id === id);
    if (findTask && findTask.completed === false) {
      const newTasksArr = [...tasks];
      newTasksArr[newTasksArr.indexOf(findTask)].completed = true;
      // console.log();
      setTasks(newTasksArr);
    } else if (findTask && findTask.completed === true) {
      const newTasksArr = [...tasks];
      newTasksArr[newTasksArr.indexOf(findTask)].completed = false;
      // console.log();
      setTasks(newTasksArr);
    }
  };

  const clearAll = (): void => {
    const conf = window.confirm("Remove all tasks?");
    conf && setTasks([]);
  };

  const clearCompleted = (): void => {
    if (tasks.some((t) => t.completed)) {
      const conf = window.confirm("Remove all completed tasks?");
      conf && setTasks(notCompletedTasks);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Oh, and what should i do?</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => setTaskValue(e.target.value)}
            value={taskValue}
            placeholder={'Task...'}
          />
          <div>
            <MdAddTask className="add-svg" onClick={submitHandler} size={30} />
          </div>
        </form>
      </header>
      <section>
        {notCompletedTasks.length === 0 ? (
          <div className="emptyTasks tasks-header">
            <p>You are cool, do nothing </p>
            <MassageSVGs width={40} />
          </div>
        ) : (
          <div className="isTasks tasks-header">
            <p>
              You are cool, but do your {notCompletedTasks.length}{" "}
              {notCompletedTasks.length === 1 ? "task" : "tasks"}{" "}
            </p>
            <PersonSVG width={40} />
          </div>
        )}
        <div className="tasks-container">
          {tasks.length > 0 && (
            <div className="clear-container">
              <p
                className={
                  notCompletedTasks.length === 0
                    ? "clear-text"
                    : "clear-text disable"
                }
                onClick={clearCompleted}
              >
                Remove completed tasks
              </p>
              <p className="clear-text" onClick={clearAll}>
                Remove all tasks
              </p>
            </div>
          )}
          <ul>
            {tasks.map((i) => (
              <TodoTask
                completed={i.completed}
                title={i.title}
                id={i.id}
                onComplete={onComplete}
                removeTask={removeTask}
                key={i.id}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default App;

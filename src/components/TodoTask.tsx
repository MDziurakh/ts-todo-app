
import React from "react";
import {BiCheckCircle} from 'react-icons/bi'
import {IoMdCloseCircleOutline} from 'react-icons/io'


interface ITodoTask {
  title: string;
  completed: boolean;
  id: number;
  onComplete: (id: number) => void;
  removeTask: (id: number) => void;
}

const TodoTask: React.FC<ITodoTask> = ({
  title,
  completed,
  id,
  onComplete,
  removeTask,
}) => {
  return (
    <li className={completed? 'completed' : undefined} >
      <BiCheckCircle className="check-svg" size={24} color={completed ? 'green' : 'gray'} onClick={() => onComplete(id)}/>
      <p>{title}</p>
      <IoMdCloseCircleOutline className="remove-svg" size={24} onClick={() => removeTask(id)}/>
    </li>
  );
};

export default TodoTask;

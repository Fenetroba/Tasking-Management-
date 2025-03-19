import React, { useEffect, useState } from "react";
import "./style/taskDetail.css";
import { format } from "date-fns";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { DeleteTask, updateTaskCompletion } from "../store/Tasks_slice";
import { toast } from "react-toastify";

const TaskDetail = ({ task, onDelete }) => {
  const dispatch = useDispatch();
  
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setIsCompleted(task.isCompleted);
    }
  }, []);

  const handleCheckboxChange = () => {
    const newCompletionStatus = !isCompleted;
    setIsCompleted(newCompletionStatus);

    if (task) {
      dispatch(
        updateTaskCompletion({
          taskId: task._id,
          isComplete: newCompletionStatus,
        })
      );
    }
  };

  const taskDeleteHandler = () => {
    if (task) {
      onDelete(task._id); // Call the passed delete handler with task ID
    }
  };

  if (!task) return null;

  const formattedCreatedAt = task.createdAt
    ? format(new Date(task.createdAt), "MMMM dd, yyyy")
    : "Date not available";

  return (
    <div className="taskDetail">
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className={!isCompleted ? "complited" : "dates"}>
        <p>Deadline: {task.deadLine}</p>
        <p>{formattedCreatedAt}</p>
        <div>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
          <label>{isCompleted ? 'Completed' : 'Not Completed'}</label>
        </div>
      </div>
      <p className="deleteButton" onClick={taskDeleteHandler}>
        <button>Delete</button>
        <RiDeleteBin4Fill style={{ color: "red", fontSize: "15px" }} />
      </p>
    </div>
  );
};

export default TaskDetail;
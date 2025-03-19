import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskCompletion } from '../store/Tasks_slice';

const ComplitedOrNot = ({ taskId }) => {
  const dispatch = useDispatch();
  
  // Get the specific task by taskId
  const task = useSelector((state) =>
    state.tasksName.tasks.find((t) => t._id === taskId)
  );

  // Local state to manage the checkbox
  const [isCompleted, setIsCompleted] = useState(false);

  // Effect to sync local state with Redux store
  useEffect(() => {
    if (task) {
      setIsCompleted(task.isCompleted); // Sync local state with task completion status
    }
  }, [task,isCompleted]); // Run effect when task changes

  const handleCheckboxChange = () => {
    if (task) {
      const newCompletionStatus = !isCompleted; // Toggle the completion status
      setIsCompleted(newCompletionStatus); // Update local state

      // Dispatch the action to update task completion status
      dispatch(
        updateTaskCompletion({
          taskId: task._id,
          isComplete: newCompletionStatus,
        })
      );
      console.log(`Task ID: ${task._id}, Completed: ${newCompletionStatus}`);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isCompleted} // Use local state for checked status
        onChange={handleCheckboxChange}
      />
      <label>
        {task ? (isCompleted ? 'Completed' : 'Not Completed') : 'Loading...'}
      </label>
    </div>
  );
};

export default ComplitedOrNot;
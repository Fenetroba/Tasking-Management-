import React from 'react';

const TaskDetail = ({ task }) => {
  if (!task) return null; // Return null if task is not provided

  return (
    <div className="taskDetail">
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.deadLine}</p>
      {/* You can add more details as needed */}
    </div>
  );
};

export default TaskDetail;
import React, { useEffect, useState } from "react";
import "./style/tasklist.css";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBack2Fill, RiSearch2Line } from "react-icons/ri";
import { findTasks } from "../store/Tasks_slice";

const TaskList = ({ taskList, taskListHandler, onSelectTask }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasksName);
  const [FindTitle, setFindTitle] = useState("");

  useEffect(() => {
    if (FindTitle) {
      dispatch(findTasks(FindTitle));
    }
  }, [dispatch, FindTitle]);

  const getDetailTaskHandler = (task) => {
    onSelectTask(task); // Call the passed function to set selected task
  };

  return (
    <div className={`tasklistSlide ${taskList ? "open" : "closed"}`}>
      <div className="task_container">
        <p onClick={taskListHandler}>
          <RiDeleteBack2Fill
            style={{
              fontSize: "30px",
              fontWeight: "900",
              cursor: "pointer",
              marginTop: "10px",
            }}
          />
        </p>
      </div>
      <div className="main_task_container">
        <h5>Find Your Tasks</h5>
        <p>
          <input
            type="search"
            onChange={(e) => setFindTitle(e.target.value)}
            value={FindTitle}
          />
          <RiSearch2Line className="searchIcon" />
        </p>
      </div>

      <div className="getedTasks">
        <h2>Task List</h2>
        {loading && <p>Loading...</p>} {/* Show loading state */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        {FindTitle && tasks.length > 0 && tasks.map((t) => (
          <div key={t._id} onClick={() => getDetailTaskHandler(t)}> {/* Pass the task to the handler */}
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>{t.deadLine}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
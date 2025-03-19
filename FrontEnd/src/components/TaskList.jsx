import React, { useEffect, useState } from "react";
import "./style/tasklist.css";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBack2Fill, RiSearch2Line } from "react-icons/ri";
import { findTasks } from "../store/Tasks_slice";
import Loader from '../components/PageLoder'
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
      <div className="main_task_contener">
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
        {loading && <Loader/>} {/* Show loading state */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        {FindTitle && tasks.length > 0 && tasks.map((t,i) => (
          <div key={t._id} onClick={() => getDetailTaskHandler(t)} className="listTasksForFind"> {/* Pass the task to the handler */}
             <p>{i+1}</p>
            <h4>{t.title}</h4>
            <p>{t.deadLine}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
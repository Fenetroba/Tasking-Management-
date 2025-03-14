import React, { useState } from "react";
import "./style/main.css";
import { useDispatch } from "react-redux";
import { createTasks } from "../store/Tasks_slice.js";
import TaskDetail from "./TaskDetail.jsx";
import TaskList from "./TaskList"; // Import the TaskList component

const Main = () => {
  const dispatch = useDispatch();
  const [createTask, setCreateTask] = useState({
    title: "",
    description: "",
    image: "",
    deadLine: "",
  });

  const [selectedTask, setSelectedTask] = useState(null); // State for the selected task

  const CreateTaskHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(createTask);
    try {
      dispatch(createTasks(createTask));
      setCreateTask({ title: "", description: "", deadLine: "", image: "" });
    } catch (error) {
      console.log("the error occurred on CreateTask: " + error);
    }
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();
      render.onloadend = () => {
        setCreateTask({ ...createTask, image: render.result });
      };
      render.readAsDataURL(file);
    }
  };

  // Function to set the selected task
  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="main">
      <section className="displayDetail">
        <TaskDetail task={selectedTask} />{" "}
        {/* Pass selectedTask to TaskDetail */}
      </section>
      <TaskList
        taskList={true}
        taskListHandler={() => {}}
        onSelectTask={handleSelectTask}
      />{" "}
      {/* Pass the select task handler */}
      <section className="box1">
        <div className="createTask">
          <h1>Create Task</h1>
          <div className="create-Task-form">
            <form onSubmit={CreateTaskHandleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={createTask.title}
                  onChange={(e) =>
                    setCreateTask({ ...createTask, title: e.target.value })
                  }
                  required
                  placeholder="Create Task"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={createTask.description}
                  onChange={(e) =>
                    setCreateTask({
                      ...createTask,
                      description: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter product description"
                  minLength={0}
                  maxLength={100}
                  style={{ width: "100%", height: "200px" }}
                />
              </div>

              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  value={createTask.deadLine}
                  onChange={(e) =>
                    setCreateTask({ ...createTask, deadLine: e.target.value })
                  }
                  required
                  placeholder="Enter the last date"
                />
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" onChange={imageHandler} accept="image/*" />
              </div>

              <button type="submit" className="submit-button">
                Create Task
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="box2">
        <div className="average_completedTasks">
          <h3>Tasks Overview</h3>
          <h3>Completed Tasks</h3>
          <h3>Expired Tasks</h3>
        </div>
        <div className="completedTasks">
          <p>Accomplished Tasks</p>
        </div>
      </section>
    </div>
  );
};

export default Main;

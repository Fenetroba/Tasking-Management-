import React, { useEffect, useState } from "react";
import "./style/main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createTasks,
  DeleteTask,
  fetchAllTasks,
} from "../store/Tasks_slice.js";
import TaskDetail from "./TaskDetail.jsx";
import TaskList from "./TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bottomImage from "../assets/bottem.jpg";
const Main = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasksName);
  const { fullTask } = useSelector((state) => state.tasksName);

  const [createTask, setCreateTask] = useState({
    title: "",
    description: "",
    image: "",
    deadLine: "",
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [back, setback] = useState(false);

  useEffect(() => {
    console.log("Tasks have changed: ", tasks);
  }, [tasks, selectedTask]);

  const CreateTaskHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTasks(createTask)).unwrap();
      toast.success("Task created successfully!");
      setCreateTask({ title: "", description: "", deadLine: "", image: "" });
    } catch (error) {
      toast.error("Error creating task: " + error.message);
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

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const taskListHandler = () => {
    setback(!back);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(DeleteTask(taskId)).unwrap(); // Delete the task
      toast.success("Task deleted successfully!");
      setSelectedTask(null); // Clear selected task after deletion
    } catch (err) {
      toast.error("Failed to delete the task.");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(fetchAllTasks()); // Dispatch the fetchAllTasks action
    };

    fetchTasks();
  }, [dispatch]);
  return (
    <div className="main">
      <ToastContainer />
      <section className="displayDetail">
        <TaskDetail task={selectedTask} onDelete={handleDeleteTask} />
        <TaskList
          taskList={!back}
          taskListHandler={taskListHandler}
          onSelectTask={handleSelectTask}
        />
      </section>

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
      <section className="box2 botton_contener">
        <div className="full_contener">
          {fullTask &&
            fullTask.map((tas,i) => (
              <div key={tas._id} className="average_completedTasks">
                <span>{i+1}</span>
                <span>{tas.title}</span>
                <span>{tas.deadLine}</span>
              </div>
            ))}
        </div>
        <div className="bottomImage">
          <img src={bottomImage} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Main;

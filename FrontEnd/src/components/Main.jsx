import React, { useState } from "react";
import "./style/main.css";
import {useDispatch} from 'react-redux'
import {createTask} from '../store/Tasks_slice.js'
const Main = () => {
// create the dispatch for the tasks data
const dispatch=useDispatch()
const [createTask,setCreateTask]=useState({
  title:'',
  description:'',
  image:'',
  deadLine:''
})



  const CreateTaskHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createTask(createTask))
      setCreateTask({ title: "", description: "", deadLine: "", image: "" });
    } catch (error) {
      console.log("the error is occer on the CreateTask" + error);
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
  return (
    <div className="main">
      <section className="displayDetail"></section>
      {/* for create task from user */}

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
                  minLength={0} maxLength={100}
                  style={{width: "100%", height: "200px"}}
                />
              </div>

              <div className="form-group">
                <label>deadLine</label>
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
    <div className="avarage_complitedTasks">
<h3> Tasks Over View</h3>
<h3> complited Tasks</h3>
<h3> expird Tasks</h3>

    </div>
    <div className="complitedTasks">
      <p>
        Accomplished Tasks
      </p>
    </div>
    

      </section>
    </div>
  );
};

export default Main;

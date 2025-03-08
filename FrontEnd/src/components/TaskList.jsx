import React, { useState } from "react";
import "./style/tasklist.css";
import { RiBankCard2Line, RiDeleteBack2Fill, RiMenu3Fill, RiXingFill } from "react-icons/ri";

const TaskList = ({taskList,taskListHandler}) => {
 
  return (
    <div className={`tasklistSlide ${taskList ? 'open':"closed"}`}>
      <div className="task_contener">
        <p onClick={taskListHandler}>
          <RiDeleteBack2Fill
            style={{
              fontSize: "30px",
              fontWeight: "900",
              cursor: "pointer",
              marginTop:'10px'
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default TaskList;

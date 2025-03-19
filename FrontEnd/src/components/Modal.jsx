import React, { useState } from 'react'
import { useEffect, useRef } from "react";

import './style/modal.css'
// import CreateAccount from './CreateAccount';
import TaskList from './TaskList';
import { RiContactsBook2Fill, RiMedal2Fill } from 'react-icons/ri';
const Modal = ({ isModalOpen, closeModel, children }) => {
const [taskList,setTaskList]=useState(false)  
const [CreateAccounts,setcreateAccount]=useState(false)  
const taskListHandler=()=>{
  setTaskList(!taskList)
  if(CreateAccounts){
    setcreateAccount(false)
  }
}
const createAccountHandler=()=>{
  setcreateAccount(!CreateAccounts)
  if(taskList){
    setTaskList(false)
  }
}

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModel();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className={`top-modal ${isModalOpen ? "open" : ""}`}>
      <div className="modal-content"  ref={modalRef}>
        <button className="close-button" onClick={closeModel}>
          &times;
        </button>

        <div className='taskList_model'>
          <button onClick={taskListHandler}>TaskList <RiContactsBook2Fill/></button>
          <TaskList taskList={taskList} taskListHandler={taskListHandler}/>
          {/* <button onClick={createAccountHandler}>Socialmedia<RiMedal2Fill/></button> */}
          {/* <CreateAccount CreateAccounts={CreateAccounts} createAccountHandler={createAccountHandler}  /> */}
       
        </div>
        {children}
      </div>

    <div className='modals_test_contener'>
    <h1 className='modalText'>Hi What You Want</h1>
    </div>
    </div>
  );
};

export default Modal
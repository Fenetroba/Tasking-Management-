import React, { useState } from "react";
import "./style/header.css";
import { RiArrowDownWideLine, RiMenu3Fill, RiTaskLine } from "react-icons/ri";
import Modal from "./Modal";
import {useDispatch, useSelector} from 'react-redux'
import { logoutUser } from "../store/userslice";
import { useEffect } from "react";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
   const dispatch=useDispatch()
   const Logout=()=>{
    dispatch(logoutUser())
  
   }
   

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className="header">
      <div className="header_contener">
        <div className="Logo">
          <h1>TASK</h1>
          <RiTaskLine style={{color:'goldenrod', marginLeft:'10px', fontSize:'30px'}}/>
        </div>
        <div className="modelsButton"  onMouseOver={toggleModal}>
          Details
          <RiArrowDownWideLine
            style={{
              fontSize: "30px",
              fontWeight: "900",
              cursor: "pointer",
            }}
          
          />
        </div>
        <Modal isModalOpen={isModalOpen} closeModel={toggleModal} />
        <div className="logoutBtn">
          <button onClick={Logout}>Logout</button>

          <p className="mobile_size">
            <RiMenu3Fill style={{ fontSize: "30px", cursor: "pointer" }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

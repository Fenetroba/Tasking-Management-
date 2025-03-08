import React, { useState } from "react";
import "./style/header.css";
import { RiArrowDownWideLine, RiMenu3Fill } from "react-icons/ri";
import Modal from "./Modal";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className="header">
      <div className="header_contener">
        <div className="Logo">
          <h1>Logo</h1>
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
          <button>Logout</button>

          <p className="mobile_size">
            <RiMenu3Fill style={{ fontSize: "30px", cursor: "pointer" }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

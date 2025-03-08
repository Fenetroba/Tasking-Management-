import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TaskList from "../components/TaskList";
import Main from "../components/Main";

const DashboardPage = () => {
  return (
    <div
    >
      <Header />
      <Main/>
      <Footer/>
      <TaskList/>
    </div>
  );
};

export default DashboardPage;

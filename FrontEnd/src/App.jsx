import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthLayer from "./pages/AuthLayer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import TaskListPage from "./pages/TaskListPage.jsx";
import UserPageAuth from "./PageAuth/UserPageAuth.jsx"; // Updated name
import UserLayer from "./pages/UserLayer.jsx";
import PageNofound from "./PageAuth/pageNofound.jsx";

function App() {
  const isAuth = false; // Use camelCase for variable naming
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <UserPageAuth isAuth={isAuth}> {/* Updated name and casing */}
            <AuthLayer />
          </UserPageAuth>
        }>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign_up" element={<RegisterPage />} />
        </Route>

      <Route path="/user"
      element={
        <UserPageAuth  isAuth={isAuth}>
          <UserLayer/>
        </UserPageAuth>
      }>
      <Route path="dash_board" element={<DashboardPage />} />
      <Route path="task_detail" element={<TaskListPage />} /> {/* Corrected path name */}
      </Route>

      <Route path="*" element={<PageNofound/>}/>
      </Routes>
    </div>
  );
}

export default App;
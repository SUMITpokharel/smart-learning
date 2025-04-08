import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar/Navbar";
import UserNavbar from "./Components/user/Nav-Bar";
import Footer from "./Pages/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import RegistrationForm from "./Pages/Registration";
import About from "./Pages/Aboutus";
import Dashboard from "./Pages/Dashboard";

import AddCategory from "./Components/user/category/Add-Category";
import CategoryList from "./Components/user/category/View-Category";
import ViewTeachers from "./Components/user/teacher/View-Teacher";
import AddTeacher from "./Components/user/teacher/Add-Teacher";
import CalendarComponent from "./Components/user/User-Calendar";
import ShareFileList from "./Components/user/Share-File";
import FileShareForm from "./Components/user/Add-Share-File";
import EditShareFile from "./Components/user/Edit-Share-File";
import NotePage from "./Components/user/note/View-Note";
import AddNote from "./Components/user/note/Add-Note";
import NoteDetails from "./Components/user/note/View-Single-Note";
import Reminder from "./Components/user/reminder/User-Reminder";
import TaskManager from "./Components/user/User-Task";
import UpdateProfile from "./Components/user/User-Profile";
import ResetPassword from "./Components/user/ResetPassword";
import LoginForm from "./Components/user/ForgotPassword";
import Chat from "./Components/user/chat";

import AdminLayout from "./Components/admin/AdminLayout";
import AdminHome from "./Components/admin/Admin-Home";
import AdminUpdateProfile from "./Components/admin/Admin-Profile";

import RecentUsers from "./Components/admin/All-Users";

const App = () => {
  const location = useLocation();
  const token = Cookies.get("token");

  const hideFooterRoutes = [
    "/login",
    "/registration",
    "/reset-password",
    "/forgot-password",
    "/user/profile-update",
    "/user/view-note",
    "/admin",
    "/admin/userlist",
    "/admin/notification",
    "/admin/profile",
  ];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {token ? <UserNavbar /> : <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Routes */}
          <Route path="/user/view-note" element={<NotePage />} />
          <Route path="/user/view-category" element={<CategoryList />} />
          <Route path="/user/add-category" element={<AddCategory />} />
          <Route path="/user/view-teacher" element={<ViewTeachers />} />
          <Route path="/user/add-teacher" element={<AddTeacher />} />
          <Route path="/user/calendar" element={<CalendarComponent />} />
          <Route path="/user/share-file" element={<ShareFileList />} />
          <Route path="/user/add-share-file" element={<FileShareForm />} />
          <Route path="/user/edit-share-file/:id" element={<EditShareFile />} />
          <Route path="/user/add-note" element={<AddNote />} />
          <Route path="/user/view-note/:id" element={<NoteDetails />} />
          <Route path="/user/Reminder" element={<Reminder />} />
          <Route path="/user/task" element={<TaskManager />} />
          <Route path="/user/profile-update" element={<UpdateProfile />} />
          <Route path="/forgot-password" element={<LoginForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/chat" element={<Chat />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="userlist" element={<RecentUsers />} />
            <Route path="profile" element={<AdminUpdateProfile />} />
          </Route>
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

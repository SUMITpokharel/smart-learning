import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const user = {
    initials: (localStorage.getItem("name") || "").slice(0, 2).toUpperCase(),
    fullName: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email") || "user@example.com",
    avatar:
      localStorage.getItem("avatar") ||
      "https://cdn.vuetifyjs.com/images/john.jpg",
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const logOut = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", route: "/dashboard" },
    { text: "Notes", route: "/user/view-note" },
    { text: "Task", route: "/user/task" },
    { text: "Calendar", route: "/user/calendar" },
    { text: "Teacher", route: "/user/view-teacher" },
    { text: "Reminder", route: "/user/reminder" },
    { text: "Category", route: "/user/view-category" },
    { text: "Share File", route: "/user/share-file" },
    { text: "Chat", route: "/chat" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#003366" }}>
      {" "}
      {/* ✅ Updated background color */}
      <Toolbar>
        {/* User Avatar & Profile Menu */}
        <Avatar
          src={user.avatar}
          alt={user.fullName}
          onClick={handleMenuOpen}
          style={{ cursor: "pointer" }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Avatar
              style={{
                backgroundColor: "brown",
                color: "white",
                marginRight: 8,
              }}
            >
              {user.initials}
            </Avatar>
            {user.fullName}
          </MenuItem>
          <MenuItem>{user.email}</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/user/profile-update");
            }}
          >
            Edit Profile
          </MenuItem>
        </Menu>

        {/* Navigation Buttons */}
        {menuItems.map((item, index) => (
          <Button
            key={index}
            color="inherit"
            onClick={() => navigate(item.route)}
          >
            {item.text}
          </Button>
        ))}

        <div style={{ flexGrow: 1 }} />

        {/* Logout Button */}
        <Button color="inherit" onClick={logOut}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;

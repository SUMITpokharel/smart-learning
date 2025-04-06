import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminSidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    initials: "",
    fullName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    setUser({
      initials: name.slice(0, 2).toUpperCase(),
      fullName: name,
      email: localStorage.getItem("email") || "",
      avatar: localStorage.getItem("avatar") || "",
    });
  }, []);

  const menuItems = [
    { text: "Home", route: "/admin" },
    { text: "Users", route: "/admin/userlist" },
    { text: "Notification", route: "/admin/notification" },
    { text: "Profile", route: "/admin/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{ backgroundColor: "#003366", color: "white" }}
      >
        <List>
          <ListItem>
            <Avatar src={user.avatar} />
            <ListItemText
              primary={user.fullName}
              secondary={user.email}
              sx={{ marginLeft: 2 }}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.route)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemText
            primary="LogOut"
            sx={{ textAlign: "center", fontWeight: "bold", color: "black" }}
          />
        </ListItem>
      </Drawer>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#003366", zIndex: 1201 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Smart Learning
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminSidebar;

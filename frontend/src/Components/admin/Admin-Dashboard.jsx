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
  Box,
} from "@mui/material";
import {
  Menu,
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
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
    { text: "Home", route: "/admin", icon: <HomeIcon /> },
    { text: "Users", route: "/admin/userlist", icon: <PersonIcon /> },
    {
      text: "Notification",
      route: "/admin/notification",
      icon: <NotificationsIcon />,
    },
    { text: "Profile", route: "/admin/profile", icon: <PersonIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 60,
          transition: "width 0.3s",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#003366",
            color: "white",
            width: drawerOpen ? 240 : 60,
            boxSizing: "border-box",
          },
        }}
      >
        {/* User Information */}
        <List>
          <ListItem
            sx={{ justifyContent: drawerOpen ? "flex-start" : "center" }}
          >
            <Avatar src={user.avatar}>{user.initials}</Avatar>
            {drawerOpen && (
              <ListItemText
                primary={user.fullName}
                secondary={user.email}
                sx={{ marginLeft: 2 }}
              />
            )}
          </ListItem>
        </List>
        <Divider />

        {/* Menu Items */}
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => navigate(item.route)}
              sx={{
                justifyContent: drawerOpen ? "flex-start" : "center",
                px: drawerOpen ? 2 : 1,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 0 }}>
                {item.icon}
              </ListItemIcon>
              {drawerOpen && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>

        {/* Logout Button (Fixed at Bottom) */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              justifyContent: drawerOpen ? "flex-start" : "center",
              px: drawerOpen ? 2 : 1,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 0 }}>
              <ExitToAppIcon sx={{ color: "black" }} />
            </ListItemIcon>
            {drawerOpen && (
              <ListItemText
                primary="LogOut"
                sx={{ textAlign: "center", fontWeight: "bold", color: "black" }}
              />
            )}
          </ListItem>
        </Box>
      </Drawer>

      {/* App Bar */}
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

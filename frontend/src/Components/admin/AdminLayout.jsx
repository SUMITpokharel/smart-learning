import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Admin-Dashboard";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

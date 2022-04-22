import React, { Fragment } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;

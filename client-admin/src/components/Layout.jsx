import React, { Fragment } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;

import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import UpcomingOutlinedIcon from "@mui/icons-material/UpcomingOutlined";
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='center'>
        <ul>
          <p className='title'>Main</p>
          <li>
            <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <p className='title'>Manage</p>
          <li>
            <PersonOutlineOutlinedIcon />
            <span>Users</span>
          </li>
          <li>
            <Inventory2OutlinedIcon className='icon' />
            <span>Products</span>
          </li>
          <li>
            <BarChartOutlinedIcon className='icon' />
            <span>Statistics</span>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon className='icon' />
            <span>Notifications</span>
          </li>
          <p className='title'>Personal</p>
          <li>
            <MailOutlinedIcon className='icon' />
            <span>Mail</span>
          </li>
          <li>
            <AssignmentIndOutlinedIcon className='icon' />
            <span>Profile</span>
          </li>
          <li>
            <SettingsOutlinedIcon className='icon' />
            <span>Settings</span>
          </li>
          <li>
            <LogoutOutlinedIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <hr />
      <div className='bottom'>
        <div className='advertising'>
          <ul>
            <p className='title'>Advertising</p>
            <li>
              <UpcomingOutlinedIcon className='icon' />
              <span>Up coming</span>
            </li>
          </ul>
        </div>
        <p className='copyright'>&copy; 2022</p>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import "./widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import UpcomingOutlinedIcon from "@mui/icons-material/UpcomingOutlined";

const Widget = ({ type }) => {
  let data; //this will come from the backend

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        link: "See all users",
        icon: <PersonOutlineOutlinedIcon className='icon' />,
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        link: "See all products",
        icon: <Inventory2OutlinedIcon className='icon' />,
      };
      break;
    case "ads":
      data = {
        title: "ADS",
        link: "Coming soon",
        icon: <UpcomingOutlinedIcon className='icon' />,
      };
      break;
    case "visitors":
      data = {
        title: "VISITORS",
        link: "Coming soon",
        icon: <UpcomingOutlinedIcon className='icon' />,
      };
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>12001</span>
        <span className='link'>{data.link}</span>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpOutlinedIcon />
          20 %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

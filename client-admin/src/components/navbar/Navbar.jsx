import React from "react";
import "./navbar.scss";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='logo'>Autoplace Admin</div>

        <div className='search'>
          <input type='text' name='search' placeholder='Search' />
          <SearchOutlinedIcon style={{ fill: "white" }} />
        </div>
        <div className='items'>
          <div className='item'>
            <LanguageOutlinedIcon className='icon' />
            English
          </div>
          <div className='item'>
            <NotificationsNoneOutlinedIcon className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <img
              src='https://images.pexels.com/photos/11293709/pexels-photo-11293709.jpeg?cs=srgb&dl=pexels-vietnam-photographer-11293709.jpg&fm=jpg'
              alt='avata'
              className='avatar'
            />
          </div>
          <div className='item'>08:00</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

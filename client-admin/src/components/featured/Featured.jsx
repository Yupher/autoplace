import React from "react";
import "./featured.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const Featured = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Totlal users</h1>
        <MoreVertOutlinedIcon fontSize="='small" />
      </div>
      <div className='bottom'>
        <div className='featuredBar'>
          <CircularProgressbar
            value={70}
            text={"70%"}
            strokeWidth={5}
            styles={buildStyles({
              textColor: "#e52727",
              pathColor: "#e52727",
              trailColor: "#e5272713",
            })}
          />
        </div>
        <p className='title'>Total new users for today</p>
      </div>
    </div>
  );
};

export default Featured;

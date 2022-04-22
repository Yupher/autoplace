import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";

const New = () => {
  return (
    <div className='new'>
      <div className='newContainer'>
        <div className='top'>
          <h1>Add New User</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src='https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg'
              alt='add'
            />
          </div>
          <div className='right'>
            <form>
              <div className='formInput'>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='username' />
              </div>
              <div className='formInput'>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='email' />
              </div>
              <div className='formInput'>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='password' />
              </div>
              <div className='formInput'>
                <label style={{ cursor: "pointer" }} htmlFor='file'>
                  Photo
                </label>
                <input type='file' id='file' style={{ display: "none" }} />
              </div>
              <button>submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

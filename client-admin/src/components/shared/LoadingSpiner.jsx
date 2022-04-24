import React from "react";

const LoadingSpiner = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: "50vh" }}
    >
      <div
        className='spinner-border text-primary '
        role='status'
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpiner;

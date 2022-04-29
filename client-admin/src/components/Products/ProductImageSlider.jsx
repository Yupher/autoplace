import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";

const ProductImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const urls = [...images.map((img) => img.secure_url)];

  const prev = (e) => {
    if (activeIndex === 0) {
      return setActiveIndex(urls.length - 1);
    }
    setActiveIndex(activeIndex - 1);
  };

  const next = (e) => {
    if (activeIndex === urls.length - 1) {
      return setActiveIndex(0);
    }
    setActiveIndex(activeIndex + 1);
  };

  return (
    <div
      id='carouselIndicators'
      className='carousel slide'
      data-ride='carousel'
    >
      <ol className='carousel-indicators'>
        {urls.map((url, index) => (
          <li
            key={index}
            data-target='#carouselIndicators'
            onClick={() => setActiveIndex(index)}
            data-slide-to={index}
            className={classNames({
              active: index === activeIndex,
            })}
          />
        ))}
      </ol>
      {urls.map((url, index) => (
        <div key={index} className='carousel-inner '>
          <div
            style={{ height: "400px" }}
            className={classNames("carousel-item w-80  ", {
              active: index === activeIndex,
            })}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              className='d-block '
              src={url}
              alt='vehicle'
            />
          </div>
        </div>
      ))}
      <button
        className='carousel-control-prev'
        onClick={prev}
        data-slide='prev'
      >
        <i
          style={{ fontSize: "40px", color: "#ff3333" }}
          className='fa fa-angle-left carousel-icons'
          aria-hidden='true'
        ></i>
        <span className='sr-only'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        onClick={next}
        data-slide='next'
      >
        <i
          style={{ fontSize: "40px", color: "#ff3333" }}
          className='fa fa-angle-right carousel-icons'
          aria-hidden='true'
        ></i>

        <span className='sr-only'>Next</span>
      </button>
    </div>
  );
};

export default ProductImageSlider;

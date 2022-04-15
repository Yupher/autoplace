import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = (props) => {
  const { header, links } = props;
  return (
    <div className='footer-links'>
      <h5 className='footer-links__title'>{header}</h5>
      <ul className='footer-links__list'>
        {links.map((link, index) => {
          console.log(link.url);
          return (
            <li key={index} className='footer-links__item'>
              <Link to={`${link.url}`} className='footer-links__link'>
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;

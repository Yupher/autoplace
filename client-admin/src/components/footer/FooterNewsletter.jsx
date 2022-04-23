import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

const FooterNewsletter = () => {
  const intl = useIntl();

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const socialLinks = [
    {
      type: "facebook",
      url: "https://www.facebook.com",
      icon: "fab fa-facebook-f",
    },
    { type: "twitter", url: "https://www.twitter.com", icon: "fab fa-twitter" },
    { type: "youtube", url: "https://www.youtube.com", icon: "fab fa-youtube" },
    {
      type: "instagram",
      url: "https://www.instagram.com",
      icon: "fab fa-instagram",
    },
  ];

  return (
    <div className='footer-newsletter'>
      <h5 className='footer-newsletter__title'>
        <FormattedMessage id='HEADER_NEWSLETTER' />
      </h5>
      <div className='footer-newsletter__text'>
        <FormattedMessage id='TEXT_NEWSLETTER_MESSAGE' />
      </div>

      <form className='footer-newsletter__form' onSubmit={handleFormSubmit}>
        <label className='sr-only' htmlFor='footer-newsletter-address'>
          <FormattedMessage id='INPUT_EMAIL_ADDRESS_LABEL' />
        </label>
        <input
          id='footer-newsletter-address'
          type='text'
          className='footer-newsletter__form-input'
          placeholder={intl.formatMessage({
            id: "INPUT_EMAIL_ADDRESS_PLACEHOLDER",
          })}
        />
        <button type='submit' className='footer-newsletter__form-button'>
          <FormattedMessage id='BUTTON_SUBSCRIBE' />
        </button>
      </form>

      <div className='footer-newsletter__text footer-newsletter__text--social'>
        <FormattedMessage id='TEXT_SOCIAL_LINKS_MESSAGE' />
      </div>

      <div className='footer-newsletter__social-links social-links'>
        <ul className='social-links__list'>
          {socialLinks.map((link, index) => (
            <li
              key={index}
              className={`social-links__item social-links__item--${link.type}`}
            >
              <a href={`${link.url}`} target='_blank' rel='noreferrer'>
                <i className={link.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterNewsletter;

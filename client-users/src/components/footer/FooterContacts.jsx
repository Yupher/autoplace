import React from "react";
import { FormattedMessage } from "react-intl";

const FooterContacts = () => {
  const company = {
    contacts: {
      phone: ["056879541", "0798451236"],
      email: ["contact-us@company.com", "support@company.com"],
      address: ["2 street capital country", "anex peace street"],
      hours: ["sun-thi 9:00-16:00", "sat 9:00-13:00"],
    },
  };
  return (
    <div className='footer-contacts'>
      <h5 className='footer-contacts__title'>
        <FormattedMessage id='HEADER_CONTACT_US' />
      </h5>
      <div className='footer-contacts__text'>
        <FormattedMessage id='TEXT_CONTACT_US_MESSAGE' />
      </div>
      <address className='footer-contacts__contacts'>
        <dl>
          <dt>
            <FormattedMessage id='TEXT_PHONE_NUMBER' />
          </dt>
          {company.contacts.phone.map((item, index) => (
            <dd key={index}>{item}</dd>
          ))}
        </dl>
        <dl>
          <dt>
            <FormattedMessage id='TEXT_EMAIL_ADDRESS' />
          </dt>
          {company.contacts.email.map((item, index) => (
            <dd key={index}>{item}</dd>
          ))}
        </dl>
        <dl>
          <dt>
            <FormattedMessage id='TEXT_OUR_LOCATION' />
          </dt>
          {company.contacts.address.map((item, index) => (
            <dd key={index}>{item}</dd>
          ))}
        </dl>
        <dl>
          <dt>
            <FormattedMessage id='TEXT_WORKING_HOURS' />
          </dt>
          {company.contacts.hours.map((item, index) => (
            <dd key={index}>{item}</dd>
          ))}
        </dl>
      </address>
    </div>
  );
};

export default FooterContacts;

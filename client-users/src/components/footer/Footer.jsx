import React from "react";
import { FormattedMessage } from "react-intl";

import Decor from "../shared/Decor";
import FooterContacts from "./FooterContacts";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  return (
    <div className='site-footer'>
      <Decor className='site-footer__decor' type='bottom' />
      <div className='site-footer__widgets'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-xl-4'>
              <FooterContacts className='site-footer__widget' />
            </div>
            <div className='col-6 col-md-3 col-xl-2'>
              <FooterLinks
                className='site-footer__widget'
                header={<FormattedMessage id='HEADER_INFORMATION' />}
                links={[
                  { title: <FormattedMessage id='LINK_ABOUT_US' /> },
                  {
                    title: <FormattedMessage id='LINK_DELIVERY_INFORMATION' />,
                  },
                  {
                    title: <FormattedMessage id='LINK_PRIVACY_POLICY' />,
                    url: "/privacy-policy",
                  },
                  {
                    title: <FormattedMessage id='LINK_BRANDS' />,
                    url: "/partners",
                  },
                  {
                    title: <FormattedMessage id='LINK_CONTACT_US' />,
                    url: "/contact-us",
                  },
                  {
                    title: <FormattedMessage id='LINK_TERMS' />,
                    url: "/terms",
                  },
                ]}
              />
            </div>
            <div className='col-6 col-md-3 col-xl-2'>
              <FooterLinks
                className='site-footer__widget'
                header={<FormattedMessage id='HEADER_MY_ACCOUNT' />}
                links={[
                  {
                    title: <FormattedMessage id='LINK_WISH_LIST' />,
                    url: "/favorit",
                  },
                  { title: <FormattedMessage id='LINK_NEWSLETTER' /> },
                  { title: <FormattedMessage id='LINK_SPECIAL_OFFERS' /> },
                  { title: <FormattedMessage id='LINK_GIFT_CERTIFICATES' /> },
                  { title: <FormattedMessage id='LINK_AFFILIATE' /> },
                ]}
              />
            </div>
            <div className='col-12 col-md-6 col-xl-4'>
              <FooterNewsletter className='site-footer__widget' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useCallback, useMemo } from "react";
import { connect, useDispatch } from "react-redux";

import { ReactComponent as ArrowRoundedRight6x9Svg } from "../../svg/arrow-rounded-right-6x9.svg";

import { setLanguage } from "../../actions/languagesActions";
import { CLOSE_MENU } from "../../actions/types/MobileMenuTypes";

import MobileMenuPanelController from "./MobileMenuPanelController";
import MobileMenuLinks from "./MobileMenuLinks";

const MobileMenuSettings = (props) => {
  const dispatch = useDispatch();
  const { setLanguage, locales, currentLocale } = props;

  const languages = useMemo(
    () =>
      locales.map((eachLanguage) => ({
        title: eachLanguage.name,
        image: eachLanguage.icon,
        customFields: {
          language: eachLanguage,
        },
      })),
    [],
  );

  const onLanguageItemClick = useCallback(
    (item) => {
      const mobileMenuClose = () => dispatch({ type: CLOSE_MENU });
      if (item.customFields && item.customFields.language) {
        setLanguage(item.customFields.language);
      }

      mobileMenuClose();
    },
    [setLanguage],
  );

  return (
    <div className='mobile-menu__settings-list'>
      <div className='mobile-menu__setting'>
        <MobileMenuPanelController
          label='Language'
          content={
            <MobileMenuLinks
              items={languages}
              onItemClick={onLanguageItemClick}
            />
          }
        >
          {(open) => (
            <button
              type='button'
              className='mobile-menu__setting-button'
              title='Language'
              onClick={open}
            >
              <span className='mobile-menu__setting-icon'>
                <img src={currentLocale.icon} alt='language' />
              </span>
              <span className='mobile-menu__setting-title'>
                {currentLocale.name}
              </span>
              <span className='mobile-menu__setting-arrow'>
                <ArrowRoundedRight6x9Svg />
              </span>
            </button>
          )}
        </MobileMenuPanelController>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  locales: state.languages.locales,
  currentLocale: state.languages.currentLocale,
});

export default connect(mapStateToProps, { setLanguage })(MobileMenuSettings);

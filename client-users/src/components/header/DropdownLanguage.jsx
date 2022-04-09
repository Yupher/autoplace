import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { setLanguage } from "../../actions/languagesActions";

import Dropdown from "./Dropdown";

const DropdownLanguage = ({ setLanguage, locales, currentLocale }) => {
  const items = useMemo(
    () =>
      locales.map((eachLanguage) => ({
        title: eachLanguage.name,
        image: eachLanguage.icon,
        language: eachLanguage,
      })),
    [],
  );

  const handleItemClick = ({ language }) => {
    setLanguage(language);
  };

  const label = (
    <React.Fragment>
      <FormattedMessage id='TEXT_TOPBAR_LANGUAGE' />:
    </React.Fragment>
  );
  return (
    <Dropdown
      label={label}
      title={currentLocale.code.toUpperCase()}
      items={items}
      onItemClick={handleItemClick}
    />
  );
};
const mapStateToProps = (state) => ({
  locales: state.languages.locales,
  currentLocale: state.languages.currentLocale,
});
export default connect(mapStateToProps, { setLanguage })(DropdownLanguage);
